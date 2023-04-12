import express from 'express';
import authAnonymous, { RequestWitUser } from '../middleware/authAnonymous';
import EventPlan from '../models/EventPlan';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';

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

export default eventsRouter;
