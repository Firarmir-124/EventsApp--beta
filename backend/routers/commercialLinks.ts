import express from 'express';
import CommercialLink from '../models/CommercialLink';
import * as crypto from 'crypto';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import { CommercialLinkType } from '../types';
import EventPlan from '../models/EventPlan';
import { RequestWitUser } from '../middleware/authAnonymous';

const commercialLinksRouter = express.Router();

commercialLinksRouter.post('/', auth, async (req, res, next) => {
  const user = (req as RequestWitUser).user;

  const randomShortUrl = crypto.randomUUID();
  try {
    const newCommLink = await CommercialLink.create({
      event: req.body.event,
      description: req.body.description,
      shortUrl: randomShortUrl,
      fullLink: `http://localhost:8000/link/${randomShortUrl}`,
      user: user.id,
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
    const commLink: CommercialLinkType | null = await CommercialLink.findOne({ _id: req.params.id }).populate(
      'user',
      'displayName',
    );

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
      user: commLink.user,
    });
  } catch (e) {
    return next(e);
  }
});

export default commercialLinksRouter;
