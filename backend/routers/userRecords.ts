import auth from '../middleware/auth';
import mongoose from 'mongoose';
import express from 'express';
import UserRecord from '../models/UserRecord';
import { RequestWitUser } from '../middleware/authAnonymous';

const usersRecordsRouter = express.Router();

usersRecordsRouter.get('/', auth, async (req, res) => {
  try {
    const user = (req as RequestWitUser).user;

    const usersList = await UserRecord.find({ name: user.id }).populate([
      { path: 'event', select: 'title' },
      { path: 'name', select: 'displayName' },
    ]);
    return res.send(usersList);
  } catch {
    return res.sendStatus(500);
  }
});

usersRecordsRouter.post('/', auth, async (req, res, next) => {
  const user = (req as RequestWitUser).user;
  try {
    const newUserRecord = await UserRecord.create({
      name: user._id,
      phone: req.body.phone,
      description: req.body.description,
      event: req.body.event,
    });

    return res.send(newUserRecord);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default usersRecordsRouter;
