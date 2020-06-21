import jwt from 'jsonwebtoken';

function getJwtPayload(req) {
  const payload = jwt.verify(req.cookies.auth, 'devSecret');
  return payload;
}

export {
  getJwtPayload,
};
