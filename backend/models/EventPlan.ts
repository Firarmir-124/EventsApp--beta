import { model, Schema, Types } from 'mongoose';
import { EventType } from '../types';
import User from './User';
import Hashtag from './Hashtag';

const EventSchema = new Schema<EventType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  speaker: {
    type: [{ name: String }],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  image: String,
  hashtag: {
    type: Schema.Types.ObjectId,
    ref: 'Hashtag',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Hashtag.findById(value),
      message: 'Такого хэштега нет !',
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'Такого пользователя нет !',
    },
  },
  createDate: String,
  viewsCount: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  guest: {
    type: [Schema.Types.ObjectId],
    ref: 'UserRecord',
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const EventPlan = model('EventPlan', EventSchema);
export default EventPlan;
