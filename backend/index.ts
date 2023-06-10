import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import usersRouter from './routers/users';
import hashtagsRoutes from './routers/hashtags';
import eventsRouter from './routers/events';
import usersRecordsRouter from './routers/userRecords';
import favoritesRouter from './routers/favorites';
import * as http from 'http';
import { Server } from 'socket.io';
import commercialLinksRouter from './routers/commercialLinks';

export const app = express();
const server = http.createServer(app);
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/hashtag', hashtagsRoutes);
app.use('/eventPlan', eventsRouter);
app.use('/userRecord', usersRecordsRouter);
app.use('/favorites', favoritesRouter);
app.use('/link', commercialLinksRouter);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let onlineUsers: { userId: string; socketId: string; name: string; status: boolean }[] = [];
const onlineRoormOnline: { userId: string; socketId: string; name: string; status: boolean }[] = [];

io.on('connection', async (socket) => {
  socket.join('rtd');

  socket.on('add', (date) => {
    io.to(date.socketId).emit('add', { status: true });
    io.sockets.in('rtd').emit('userId', date.test);
  });

  socket.on('new-user-add', async (newUserId) => {
    onlineUsers = onlineUsers.map((n) => (n.userId === newUserId.id ? { ...n, status: false } : n));

    if (!onlineUsers.some((user) => user.userId === newUserId.id)) {
      onlineUsers.push({ userId: newUserId.id, name: newUserId.name, socketId: socket.id, status: false });
    }

    io.sockets.in('rtd').emit('get-users', onlineUsers);
  });

  socket.on('exitTheRoom', (date) => {
    const index = onlineRoormOnline.indexOf(date.userId);

    console.log(onlineRoormOnline);

    if (index === -1) {
      onlineRoormOnline.splice(index, 1);
      io.emit('onlineRoom', onlineRoormOnline);
    }
  });

  socket.on('offline', () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit('get-users', onlineUsers);
  });

  socket.on('ExitUser', () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.sockets.in('rtd').emit('get-users', onlineUsers);
  });

  socket.on('confirmed', (date) => {
    io.to(date.socketId).emit('confirmed', { status: true });
  });

  socket.on('entered-the-room', (date) => {
    onlineUsers = onlineUsers.map((n) => (n.userId === date.userId ? { ...n, status: true } : n));
    io.emit('get-users', onlineUsers);
    const user = onlineUsers.find((item) => item.userId === date.userId);
    if (user) {
      const index = onlineRoormOnline.findIndex((item) => item.userId === user.userId);
      if (index !== -1) {
        onlineRoormOnline.splice(index, 1);
      } else {
        user.status = false;
        onlineRoormOnline.push(user);
        io.emit('onlineRoom', onlineRoormOnline);
      }
    }
  });

  socket.on('position', (msg) => {
    socket.broadcast.emit('position', msg);
  });

  socket.on('textOnTitle', (msg) => {
    socket.broadcast.emit('textOnTitle', msg);
  });

  socket.on('textOnAddress', (msg) => {
    socket.broadcast.emit('textOnAddress', msg);
  });

  socket.on('textOnDescription', (msg) => {
    socket.broadcast.emit('textOnDescription', msg);
  });

  socket.on('addSpeaker', (msg) => {
    socket.broadcast.emit('addSpeaker', msg);
  });

  socket.on('removeSpeaker', (msg) => {
    socket.broadcast.emit('removeSpeaker', msg);
  });

  socket.on('textOnSpeaker', (msg) => {
    socket.broadcast.emit('textOnSpeaker', msg);
  });

  socket.on('textOnDate', (msg) => {
    socket.broadcast.emit('textOnDate', msg);
  });

  socket.on('textOnHashtag', (msg) => {
    socket.broadcast.emit('textOnHashtag', msg);
  });

  socket.on('onSubmit', (msg) => {
    socket.broadcast.emit('onSubmit', msg);
  });

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit('get-users', onlineUsers);
  });
});

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  server.listen(port, () => {
    console.log('We are live on ' + port);
  });
  process.on('exit', () => {
    void mongoose.disconnect();
  });
};

run().catch(console.error);
