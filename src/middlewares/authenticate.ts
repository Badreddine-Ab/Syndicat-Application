import { Request, Response, NextFunction } from 'express';
import * as jwt from '../utils/jwt';
import { JWT_SECRET } from '../utils/jwt';
import * as httpErrors from '../utils/httpErrors';
import { RequestWithUser } from '../types/requestWithUser ';

export async function authenticate(req: RequestWithUser, res: Response, next: NextFunction) {
  // Check if the request has the 'Authorization' header
  if (!req.headers.authorization) {
    throw httpErrors.unauthorized('No token was provided');
  }

  // Get the JWT from the 'Authorization' header
  const token = req.headers.authorization.split(' ')[1];

  try {
    // Verify the JWT and get the payload
    const payload = jwt.verify(token);

    // Attach the user to the request object
    req.user = payload;

    // Call the next middleware
    next();
  } catch (error) {
    // If the JWT is invalid, return a 401 Unauthorized error
    throw httpErrors.unauthorized('Token is invalid');
  }
}
