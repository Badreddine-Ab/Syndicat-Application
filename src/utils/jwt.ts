import jwt from 'jsonwebtoken';

// The secret that is used to sign the JWT
export const JWT_SECRET = process.env.JWT_SECRET as string;

// The payload that will be included in the JWT
export interface JwtPayload {
  // The ID of the user that the JWT belongs to
  id: string;
}

// Generates a JWT for the given payload
export function sign(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET);
}

// Verifies a JWT and returns the decoded payload
export function verify(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
