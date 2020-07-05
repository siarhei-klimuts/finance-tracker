import { v4 as uuid } from 'uuid';
import multer from 'multer';
import { promises as fs } from 'fs';
import xml2js from 'xml2js';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import 'numeral/locales/ru';

import Operation from 'data/Operation';
import { getJwtPayload } from 'data/auth';

numeral.locale('ru');

const upload = multer({ dest: 'uploads/' });
const parser = new xml2js.Parser({
  preserveChildrenOrder: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const INPUT_DATE_FORMAT = 'DD.MM.YYYY';
const API_DATE_FORMAT = 'YYYY-MM-DD';

const parseAmount = (value) => numeral(value).value();

const fieldsConfig = {
  Date: {
    name: 'date',
    getValue: (value) => moment(value, INPUT_DATE_FORMAT).format(API_DATE_FORMAT),
  },
  Note: {
    name: 'note',
    getValue: (value) => value,
  },
  'Amount in account currency': {
    name: 'amount',
    getValue: parseAmount,
  },
  'Amount in transaction currency': {
    name: 'transactionCurrencyAmount',
    getValue: parseAmount,
  },
};

// eslint-disable-next-line no-shadow
const parseField = ({ $: { name }, _ }) => ({
  name: fieldsConfig[name].name,
  value: fieldsConfig[name].getValue(_),
});

const addFields = ({ amount, ...record }) => ({
  ...record,
  type: amount < 0 ? 'expense' : 'income',
  amount: Math.abs(amount),
  uuid: uuid(),
});

const parseRow = (row) => _(row)
  .map(parseField)
  .keyBy('name')
  .mapValues('value')
  .value();

const parseResult = ({ items: { item } }) => _.map(item, ({ field }) => addFields(parseRow(field)));

async function findSimilarOperations(records, user) {
  const startDate = _.minBy(records, 'date')?.date;
  const endDate = _.maxBy(records, 'date')?.date;

  const operations = await Operation.find({
    $and: [
      { date: { $gte: startDate } },
      { date: { $lte: endDate } },
      { user },
    ],
  });

  return operations;
}

function isEqual(newRecord, existingOperation) {
  return newRecord.date === existingOperation.date
    && newRecord.amount === existingOperation.amount
    && newRecord.type === existingOperation.type;
}

function applyDuplicates(newRecords, existingOperations) {
  return _.map(newRecords, (record) => {
    const match = _.find(existingOperations, (operation) => isEqual(record, operation));
    return {
      ...record,
      duplicate: match,
    };
  });
}

export default async (req, res) => {
  const { user } = getJwtPayload(req);
  await runMiddleware(req, res, upload.single('report'));
  const fileContent = await fs.readFile(req.file.path, { encoding: 'utf8' });
  const report = await parser.parseStringPromise(fileContent);
  const records = parseResult(report);
  const operations = await findSimilarOperations(records, user);
  const recordsWithDuplicates = applyDuplicates(records, operations);

  res.status(200).json(recordsWithDuplicates);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
