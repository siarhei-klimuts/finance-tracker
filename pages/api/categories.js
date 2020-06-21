import Category from 'data/Category';

export default async (req, res) => {
  res.statusCode = 200;
  res.json(await Category.find());
}