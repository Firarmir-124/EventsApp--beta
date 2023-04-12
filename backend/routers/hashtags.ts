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

export default hashtagsRoutes;
