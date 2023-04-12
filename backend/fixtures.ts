import mongoose from 'mongoose';
import config from './config';
import User from './models/Users';
import EventPlan from './models/EventPlan';
import crypto from 'crypto';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const user = await User.create({
    email: `admin@mail.com`,
    displayName: 'admin',
    password: '123',
    token: crypto.randomUUID(),
    role: 'organizer',
  });

  for (let i = 0; i <= 50; i++) {
    await EventPlan.create({
      title: `test${i}`,
      description: `test${i}`,
      speaker: [
        {
          name: `Roma`,
        },
        {
          name: `Dima`,
        },
      ],
      time: `test${i}`,
      image: null,
      hashtag: `test${i}`,
      user: user._id,
    });
  }

  await db.close();
};

void run();
