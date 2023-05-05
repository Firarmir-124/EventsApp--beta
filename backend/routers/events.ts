import express from 'express';
import authAnonymous, { RequestWitUser } from '../middleware/authAnonymous';
import EventPlan from '../models/EventPlan';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';

const eventsRouter = express.Router();

const getEvents = async (page: number, perPage: number, filter: any | null) => {
  const eventLength = await EventPlan.count(filter);
  const eventPlanList = await EventPlan.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .select(['title', 'speaker', 'time', 'image', 'hashtag', 'user'])
    .sort({ createDate: -1 })
    .populate('hashtag');
  return {
    length: eventLength,
    list: eventPlanList,
  };
};

eventsRouter.get('/', authAnonymous, async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 8;
  const allEvents = req.query.allEvents as string;

  try {
    if (allEvents !== undefined) {
      const titleEvents = await EventPlan.find().select('title');
      return res.send(titleEvents);
    } else if (req.query.filter !== undefined) {
      const filter = JSON.parse(req.query.filter as string);
      const list = await getEvents(page, perPage, filter);

      return res.send({
        length: list.length,
        perPage,
        eventList: list.list,
        pages: Math.ceil(list.length / perPage),
      });
    } else {
      const list = await getEvents(page, perPage, null);

      return res.send({
        length: list.length,
        perPage,
        eventList: list.list,
        pages: Math.ceil(list.length / perPage),
      });
    }
  } catch {
    return res.sendStatus(500);
  }
});

eventsRouter.post('/filter', auth, permit('organizer'), async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 8;
  const filter = req.body;
  const list = await getEvents(page, perPage, filter);

  return res.send({
    length: list.length,
    perPage,
    eventList: list.list,
    pages: Math.ceil(list.length / perPage),
  });
});

eventsRouter.post('/', imagesUpload.single('image'), auth, permit('organizer'), async (req, res, next) => {
  try {
    const user = (req as RequestWitUser).user;

    const newEventPlan = await EventPlan.create({
      title: req.body.title,
      description: req.body.description,
      speaker: JSON.parse(req.body.speaker),
      time: req.body.time,
      image: req.file && req.file.filename,
      hashtag: req.body.hashtag,
      user: user._id,
      createDate: new Date().toISOString(),
    });

    await res.cookie('test', newEventPlan);

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

eventsRouter.put('/:id', imagesUpload.single('image'), auth, permit('organizer'), async (req, res, next) => {
  try {
    const newEventPlan = {
      title: req.body.title,
      description: req.body.description,
      speaker: JSON.parse(req.body.speaker),
      time: req.body.time,
      hashtag: req.body.hashtag,
      image: req.file && req.file.filename,
    };

    await EventPlan.updateMany({ _id: req.params.id }, { $set: newEventPlan });
    return res.send(newEventPlan);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

eventsRouter.delete('/:id', auth, permit('organizer'), async (req, res, next) => {
  try {
    await EventPlan.deleteOne({ _id: req.params.id });
    return res.send({ remove: req.params.id });
  } catch (e) {
    return next(e);
  }
});

export default eventsRouter;
