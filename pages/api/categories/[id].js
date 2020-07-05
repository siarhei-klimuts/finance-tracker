import Category from 'data/Category';

async function handlePost(req, res) {
  const category = await Category.findOneAndUpdate({ _id: req.query.id }, req.body);
  res.json(category.toJSON());
}

async function handleDelete(req, res) {
  await Category.deleteOne({ _id: req.query.id });
  res.status(200).end();
}

export default async (req, res) => {
  switch (req.method) {
    case 'DELETE':
      return handleDelete(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      res.setHeader('Allow', ['DELETE', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
