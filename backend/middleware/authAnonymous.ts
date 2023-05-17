import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../types';
import User from '../models/User';

export interface RequestWitUser extends Request {
  user: HydratedDocument<IUser>;
}

const authAnonymous = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as RequestWitUser;
  const token = expressReq.get('Authorization');

  if (!token) {
    return next();
  }

  const user = await User.findOne({ token });

  if (!user) {
    return next();
  }

  req.user = user;
  return next();
};

export default authAnonymous;
