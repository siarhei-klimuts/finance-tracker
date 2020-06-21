import multer from 'multer';
import { promises as fs } from 'fs'
import xml2js from 'xml2js';
import _ from 'lodash';
import moment from 'moment';

import Operation from 'data/Operation';

const upload = multer({ dest: 'uploads/' });
const parser = new xml2js.Parser({
  preserveChildrenOrder: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const INPUT_DATE_FORMAT = 'DD.MM.YYYY';
const API_DATE_FORMAT = 'YYYY-MM-DD';

const parseAmount = (value) => parseFloat(_(value).split(' ').first().replace(',', '.'));

const fieldsConfig = {
  'Date': {
    name: 'date',
    getValue: (value) => moment(value, INPUT_DATE_FORMAT).format(API_DATE_FORMAT),
  },
  'Note': {
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

const parseField = ({ $: { name }, _ }) => ({
  name: fieldsConfig[name].name,
  value: fieldsConfig[name].getValue(_),
});

const addFields = ({amount, ...record}) => ({
  ...record,
  type: amount < 0 ? 'expense' : 'income',
  amount: Math.abs(amount),
});

const parseRow = (row) => _(row)
  .map(parseField)
  .keyBy('name')
  .mapValues('value')
  .value()

const parseResult = ({ items: { item }}) => _.map(item, ({ field }) => addFields(parseRow(field)));

export default async (req, res) => {
  await runMiddleware(req, res, upload.single('report'));
  const fileContent = await fs.readFile(req.file.path, {encoding: 'utf8'});
  const report = await parser.parseStringPromise(fileContent);
  const records = parseResult(report);

  // const newOperations = await Promise.all(
  //   _(records)
  //     .map((record) => Operation.create({
  //       ...record,
  //       user: 'ClJ05mKhmbOdbqyn',
  //       account: req.body.accountId,
  //     }))
  //     .map((operation) => operation.save())
  // );

  res.statusCode = 200;
  res.json(records);
}

export const config = {
  api: {
    bodyParser: false,
  }
};