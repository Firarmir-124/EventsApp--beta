import express from 'express';
import CommercialLink from '../models/CommercialLink';
import * as crypto from 'crypto';
import mongoose from 'mongoose';
import auth from '../middleware/auth';

const commercialLinksRouter = express.Router();

commercialLinksRouter.post('/', auth, async (req, res, next) => {
  const randomShortUrl = crypto.randomUUID();
  try {
    const newCommLink = await CommercialLink.create({
      event: req.body.location,
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

export default commercialLinksRouter;
