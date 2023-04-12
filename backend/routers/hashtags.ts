import express from 'express';
import Hashtag from '../models/Hashtag';

const hashtagsRoutes = express.Router();

hashtagsRoutes.get('/', async (req, res) => {
  try {
    const hashtagList = await Hashtag.find();
    return res.send(hashtagList);
  } catch {
    return res.sendStatus(500);
  }
});

export default hashtagsRoutes;
