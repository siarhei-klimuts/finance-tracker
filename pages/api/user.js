import { getJwtPayload } from 'data/auth';
import User from 'data/User';

export default async (req, res) => {
  const { id } = getJwtPayload(req);

  res.statusCode = 200;
  res.json(await User.findOne({_id: id}));
}