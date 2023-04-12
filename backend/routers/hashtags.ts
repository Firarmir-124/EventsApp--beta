import express from 'express';
import Hashtag from '../models/Hashtag';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const hashtagsRoutes = express.Router();

hashtagsRoutes.get('/', async (req, res) => {
  try {
    const hashtagList = await Hashtag.find();
    return res.send(hashtagList);
  } catch {
    return res.sendStatus(500);
  }
});

hashtagsRoutes.post('/', auth, permit('organizer'), async (req, res, next) => {
  try {
    const newHashtag = await Hashtag.create({
      name: req.body.name,
    });

    return res.send(newHashtag);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

hashtagsRoutes.get('/:id', auth, permit('organizer'), async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({ _id: req.params.id });
    return res.send(hashtag);
  } catch {
    return res.sendStatus(500);
  }
});

hashtagsRoutes.put('/:id', auth, permit('organizer'), async (req, res, next) => {
  try {
    await Hashtag.updateOne({ _id: req.params.id }, { name: req.body.name });
    return res.send({ edit: req.params.id });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

hashtagsRoutes.delete('/:id', auth, permit('organizer'), async (req, res, next) => {
  try {
    await Hashtag.deleteOne({ _id: req.params.id });
    return res.send({ remove: req.params.id });
  } catch (e) {
    return next(e);
  }
});

export default hashtagsRoutes;
