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
    .sort({ createDate: -1 })
    .populate('hashtag')
    .populate({
      path: 'guest',
      select: ['name', 'phone'],
      populate: {
        path: 'name',
        select: 'displayName',
      },
    });
  return {
    length: eventLength,
    list: eventPlanList,
  };
};

eventsRouter.post('/', authAnonymous, async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 8;
  const allEvents = req.query.allEvents as string;
  const filter = req.body;

  try {
    if (allEvents !== undefined) {
      const titleEvents = await EventPlan.find().select('title');
      return res.send(titleEvents);
    } else {
      const list = await getEvents(page, perPage, filter);

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

eventsRouter.post('/filter', async (req, res) => {
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

eventsRouter.post('/create', imagesUpload.single('image'), auth, permit('organizer'), async (req, res, next) => {
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
      address: req.body.address,
    });

    console.log(newEventPlan);

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
    if (eventPlan) {
      await EventPlan.updateOne({ _id: req.params.id }, { $inc: { viewsCount: 1 } });
    }
    return res.send(eventPlan);
  } catch {
    return res.sendStatus(500);
  }
});

eventsRouter.patch('/checked', auth, async (req, res, next) => {
  try {
    if (req.query.allChecked !== undefined) {
      await EventPlan.updateMany({ checked: false });
      return res.send({ patch: false });
    } else if (req.query.checked !== undefined) {
      const EventOne = await EventPlan.findOne({ _id: req.query.checked });

      if (!EventOne) {
        return res.status(404).send({ error: 'Евента не существует в базе.' });
      }

      if (!EventOne.checked) {
        EventOne.checked = req.body.checked;
      } else {
        EventOne.checked = !req.body.checked;
      }

      await EventOne.save();
      return res.send(EventOne.checked);
    }
  } catch (e) {
    return next(e);
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
