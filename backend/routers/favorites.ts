import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Favorites from '../models/Favorites';
import mongoose from 'mongoose';

const favoritesRouter = express.Router();

favoritesRouter.get('/', auth, async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;
    const favoritesList = await Favorites.findOne({ user: user._id }).populate({ path: 'event.list' });
    return res.send(favoritesList);
  } catch (e) {
    return res.sendStatus(500);
  }
});

favoritesRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const favoritesList = await Favorites.findOne({ user: user._id });

    if (favoritesList) {
      const index = favoritesList.event.findIndex((item) => item.list?.toString() === req.body.event.list);

      if (index !== -1) {
        favoritesList.event.splice(index, 1);
        await favoritesList.save();
        res.send('Удалился');
      } else {
        await Favorites.updateOne({ user: user._id }, { $push: { event: req.body.event } });
        res.send('Добавился');
      }
    } else {
      const newFavorites = await Favorites.create({
        user: user._id,
        event: req.body.event,
      });
      res.send(newFavorites);
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

favoritesRouter.delete('/', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;
  const deleteOne = req.query.deleteOne as string;
  const deleteSelected = req.query.deleteSelected as string;
  const deleteAll = req.query.deleteAll as string;

  try {
    const favoritesOne = await Favorites.findOne({ user: user._id });
    if (!favoritesOne) return res.sendStatus(403);

    if (deleteOne) {
      const index = favoritesOne.event.findIndex((item) => item.list?.toString() === deleteOne);
      if (index !== -1) {
        favoritesOne.event.splice(index, 1);
        await favoritesOne.save();
        return res.send({ remove: deleteOne });
      }
    } else if (deleteSelected) {
      favoritesOne.event = favoritesOne.event.filter((item) => item.show === true);
      await favoritesOne.save();
      return res.send('Удаленно несколько сущностей');
    } else if (deleteAll) {
      await Favorites.deleteOne({ _id: deleteAll });
      return res.send('Удалены все сущности');
    }
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default favoritesRouter;
