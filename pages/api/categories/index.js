import Category from 'data/Category';
import { getJwtPayload } from 'data/auth';

async function get(req, res) {
  res.statusCode = 200;
  res.json(await Category.find());
}

async function post(req, res) {
  const {id} = getJwtPayload(req);
  const category = await Category.create({
    name: req.body.name,
    type: 'OTHER',
    user: id,
  }).save();

  res.statusCode = 200;
  res.json(category);
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