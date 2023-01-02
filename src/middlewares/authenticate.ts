import { Response, NextFunction } from 'express';
import { RequestWithUserId } from '../types/requestWithUserId';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwt';
import { HttpError } from '../utils/httpErrors';
import { JwtPayload } from '../utils/jwt';


export function authenticate(req: RequestWithUserId, res: Response, next: NextFunction) {
    try {
      // Get the JWT from the request header
      const token = req.header('Authorization');
      if (!token) {
        throw new HttpError(401, 'No token provided');
      }
  
      // Verify the JWT
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  
      // Add the user ID from the JWT to the request object
      req.userId = decoded.id;
  
      // Call the next middleware or route handler
      next();
    } catch (error) {
      next(error);
    }
  }