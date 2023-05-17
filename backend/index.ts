import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import usersRouter from './routers/users';
import hashtagsRoutes from './routers/hashtags';
import eventsRouter from './routers/events';
import usersRecordsRouter from './routers/userRecords';
import favoritesRouter from './routers/favorites';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/hashtag', hashtagsRoutes);
app.use('/eventPlan', eventsRouter);
app.use('/userRecord', usersRecordsRouter);
app.use('/favorites', favoritesRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
  process.on('exit', () => {
    void mongoose.disconnect();
  });
};

run().catch(console.error);
