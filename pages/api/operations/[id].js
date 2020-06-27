import { getJwtPayload } from 'data/auth';
import Operation from 'data/Operation';

async function handlePost(req, res) {
  const { id } = getJwtPayload(req);
  const operation = await Operation.findOneAndUpdate({ _id: req.query.id, user: id }, req.body);
  res.json(operation.toJSON());
}

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
