import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from '../utils/jwt';
import * as httpErrors from '../utils/httpErrors';
import { User } from '../models/users';
import { RequestWithUserId } from '../types/requestWithUserId';

export async function  login  (req: RequestWithUserId, res: Response){
    const { email, password } = req.body;
  
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw httpErrors.unauthorized('Email not found');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw httpErrors.unauthorized('password failed');
    }
  
    // Store the user ID in the session object
    req.session.userId = user.id;
  
    // Return the JWT in the response
    res.status(200).json({ token: jwt.sign({ _id: user._id }) });
  };

  
  export const signout = (req: Request, res: Response) => {
    // Clear the session data
    req.session.destroy((err) => {
      if (err) {
        // If there was an error deleting the session data, send a 500 Internal Server Error response
        res.status(500).send();
        return;
      }
  
      // If the session data was deleted successfully, send a 200 OK response
      console.log("logged out")
      res.sendStatus(200);
    });
  };