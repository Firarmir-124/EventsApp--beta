import express from 'express';
import CommercialLink from '../models/CommercialLink';
import * as crypto from 'crypto';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import { CommercialLinkType } from '../types';
import EventPlan from '../models/EventPlan';

const commercialLinksRouter = express.Router();

commercialLinksRouter.post('/', auth, async (req, res, next) => {
  const randomShortUrl = crypto.randomUUID();
  try {
    const newCommLink = await CommercialLink.create({
      event: req.body.event,
      description: req.body.description,
      shortUrl: randomShortUrl,
      fullLink: `http://localhost:8000/link/${randomShortUrl}`,
      title: req.body.title,
    });

    return res.send(newCommLink);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

commercialLinksRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const commLink = await CommercialLink.findOne({ shortUrl: req.params.shortUrl });

    if (!commLink) {
      return res.status(404).send({ message: 'Ссылка недествительна !' });
    }
    return res.status(302).redirect(`http://localhost:3000/link/${commLink._id}`);
  } catch (e) {
    return next(e);
  }
});

commercialLinksRouter.get('/event/:id', async (req, res, next) => {
  try {
    const commLink: CommercialLinkType | null = await CommercialLink.findOne({ _id: req.params.id });

    if (!commLink) return res.status(404).send({ error: 'Ссылка недействительна !' });

    const events = await EventPlan.find({ _id: commLink.event })
      .populate('hashtag')
      .populate({
        path: 'guest',
        select: ['name', 'phone'],
        populate: {
          path: 'name',
          select: 'displayName',
        },
      });

    return res.send({
      event: events,
      description: commLink.description,
      title: commLink.title,
    });
  } catch (e) {
    return next(e);
  }
});

export default commercialLinksRouter;
