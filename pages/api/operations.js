import _ from 'lodash';

import { getJwtPayload } from 'data/auth';
import Operation from 'data/Operation';

async function get(req, res) {
  const { id } = getJwtPayload(req);

  res.statusCode = 200;
  res.json(await Operation.find({user: id}));
}

async function post(req, res) {
  const { id } = getJwtPayload(req);

  const newOperations = await Promise.all(
    _(req.body)
      .map((record) => Operation.create({
        ...record,
        user: id,
      }))
      .map((operation) => operation.save())
  );

  res.statusCode = 200;
  res.json(newOperations);
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      return get(req, res);
    case 'POST':
      return post(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}