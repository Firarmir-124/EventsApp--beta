import mongoose from 'mongoose';
import config from './config';
import User from './models/Users';
import { randomUUID } from 'crypto';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  for (let i = 0; i <= 50; i++) {
    await User.create({
      displayName: `Admin${i}`,
      email: `test${i}@test.com`,
      role: 'admin',
      password: '@esdpjs17',
      token: randomUUID(),
    });
  }

  await db.close();
};

void run();
