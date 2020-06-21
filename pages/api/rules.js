import Rule from 'data/Rule';

export default async (req, res) => {
  res.statusCode = 200;
  res.json(await Rule.find());
}