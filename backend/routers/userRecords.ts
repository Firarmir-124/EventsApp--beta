import auth from '../middleware/auth';
import mongoose from 'mongoose';
import express from 'express';
import UserRecord from '../models/UserRecord';
import { RequestWitUser } from '../middleware/authAnonymous';
import permit from '../middleware/permit';

const usersRecordsRouter = express.Router();

usersRecordsRouter.get('/', auth, async (req, res) => {
  try {
    const user = (req as RequestWitUser).user;

    if (user.role === 'organizer') {
      const usersList = await UserRecord.find().populate([
        { path: 'event', select: 'title' },
        { path: 'name', select: 'displayName' },
      ]);
      return res.send(usersList);
    }

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

usersRecordsRouter.patch('/:id/isPublished', auth, permit('organizer'), async (req, res) => {
  try {
    const close = req.query.close;

    if (close) {
      await UserRecord.updateOne({ _id: req.params.id }, { status: 'close' });
      return res.send({ published: req.params.id });
    }

    await UserRecord.updateOne({ _id: req.params.id }, { status: true });
    return res.send({ published: req.params.id });
  } catch (e) {
    return res.sendStatus(500);
  }
});

usersRecordsRouter.delete('/:id', auth, async (req, res) => {
  const user = (req as RequestWitUser).user;
  const _id = req.params.id;

  try {
    const oneRecordUser = await UserRecord.findOne({ _id });

    if (!oneRecordUser) {
      return res.status(404).send({ error: 'Данного запроса нет !' });
    }

    if (user._id.toString() !== oneRecordUser.name.toString()) {
      return res.status(403).send({ error: 'Нельзя удалить чужой запрос !' });
    }

    await UserRecord.deleteOne({ _id });
    return res.send({ remove: _id });
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default usersRecordsRouter;
