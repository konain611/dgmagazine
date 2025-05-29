import jwt from 'jsonwebtoken';

export function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
  if (process.env.NODE_ENV === 'development') {
    console.error('JWT verification failed:', err);
  }
  return null;
}

}
