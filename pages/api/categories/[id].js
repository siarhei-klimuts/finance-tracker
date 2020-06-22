import Category from 'data/Category';

export default async (req, res) => {
  const category = await Category.findOneAndUpdate({_id: req.query.id}, req.body);
  res.json(category.toJSON());
}