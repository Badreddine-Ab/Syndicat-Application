import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/users';
import { JWT_SECRET } from '../utils/jwt';
import { errorHandler } from '../middlewares/errorHandler';
import { HttpError } from '../utils/httpErrors';

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Validate the email and password
    if (!email || !password) {
      throw new HttpError(400, 'Missing email or password');
    }

    // Find a user with the matching email
    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(401, 'Invalid email or password');
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpError(401, 'Invalid email or password');
    }

    // Generate a JWT for the user
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    // Send the JWT in the response
    res.send({ token });
  } catch (error) {
    next(error);
  }
}

export async function signOut(req: Request, res: Response, next: NextFunction) {
  try {
    // The user has already been authenticated by the authenticate middleware,
    // so we can just send a success response
    res.send({ message: 'Successfully signed out' });
  } catch (error) {
    next(error);
  }
}
