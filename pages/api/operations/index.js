import _ from 'lodash';

import { getJwtPayload } from 'data/auth';
import Operation from 'data/Operation';

async function GET(req, res) {
  const { id } = getJwtPayload(req);
  const operations = await Operation.find({ user: id }, { populate: false });

  return res.status(200).json(operations);
}

async function POST(req, res) {
  const { id } = getJwtPayload(req);

  const newOperations = await Promise.all(
    _(req.body)
      .map((record) => Operation.create({
        ...record,
        user: id,
      }))
      .map((operation) => operation.save()),
  );

  res.statusCode = 200;
  res.json(newOperations);
}

const methods = {
  GET,
  POST,
};

function defaultHandler(req, res) {
  res.setHeader('Allow', _.values(methods));
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

const getHandler = (method) => methods[method] || defaultHandler;

export default async (req, res) => getHandler(req.method)(req, res);
