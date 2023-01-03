
import { Session } from 'express-session';
import { Request } from 'express';


  export interface RequestWithUserId extends Request {
    session: Session & { userId: string };
  }