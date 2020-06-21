import Account from 'data/Account';

export default async (req, res) => {
  res.statusCode = 200;
  res.json(await Account.find());
}