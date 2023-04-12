import express from 'express';
import authAnonymous, { RequestWitUser } from '../middleware/authAnonymous';
import EventPlan from '../models/EventPlan';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import { EventType } from '../types';

const eventsRouter = express.Router();

eventsRouter.get('/', authAnonymous, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = 15;

    const eventPlanListFull = await EventPlan.find();

    const eventPlanList = await EventPlan.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select(['title', 'speaker', 'time', 'image', 'hashtag', 'user']);

    return res.send({ eventPlanListLength: eventPlanListFull.length, eventPlanList });
  } catch {
    return res.sendStatus(500);
  }
});

eventsRouter.post('/', auth, permit('organizer'), async (req, res, next) => {
  try {
    const user = (req as RequestWitUser).user;

    const newEventPlan = await EventPlan.create({
      title: req.body.title,
      description: req.body.description,
      speaker: req.body.speaker,
      time: req.body.time,
      image: req.file && req.file.filename,
      hashtag: req.body.hashtag,
      user: user._id,
    });

    return res.send(newEventPlan);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

eventsRouter.get('/:id', async (req, res) => {
  try {
    const eventPlan = await EventPlan.findOne({ _id: req.params.id });
    return res.send(eventPlan);
  } catch {
    return res.sendStatus(500);
  }
});

eventsRouter.put('/:id', auth, permit('organizer'), async (req, res, next) => {
  try {
    const eventPlan = (await EventPlan.findOne({ _id: req.params.id })) as EventType;

    const newEventPlan = {
      title: req.body.title,
      description: req.body.description,
      speaker: req.body.speaker,
      time: req.body.time,
      hashtag: req.body.hashtag,
    };

    if (eventPlan.title !== newEventPlan.title) {
      await EventPlan.updateOne({ _id: req.params.id }, { $set: newEventPlan.title });
      res.send({ _id: req.params.id });
    } else if (eventPlan.description !== newEventPlan.description) {
      await EventPlan.updateOne({ _id: req.params.id }, { $set: newEventPlan.description });
      res.send({ _id: req.params.id });
    } else if (eventPlan.speaker !== newEventPlan.speaker) {
      await EventPlan.updateOne({ _id: req.params.id }, { $set: newEventPlan.speaker });
      res.send({ _id: req.params.id });
    } else if (eventPlan.time !== newEventPlan.time) {
      await EventPlan.updateOne({ _id: req.params.id }, { $set: newEventPlan.time });
      res.send({ _id: req.params.id });
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default eventsRouter;
