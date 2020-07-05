import jwt from 'jsonwebtoken';

function getJwtPayload(req) {
  const payload = jwt.verify(req.cookies.auth, 'devSecret');
  return {
    ...payload,
    user: payload.id,
  };
}

export {
  getJwtPayload,
};
