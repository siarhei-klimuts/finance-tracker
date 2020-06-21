import User from 'data/User';

export default async (req, res) => {
  res.statusCode = 200;
  res.json(await User.find());
}