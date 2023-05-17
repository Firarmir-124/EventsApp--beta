import { model, Schema, Types } from 'mongoose';
import { RecordUserType } from '../types';
import User from './User';

const RecordUserSchema = new Schema<RecordUserType>({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'Такого пользователя нет !',
    },
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const UserRecord = model('UserRecord', RecordUserSchema);
export default UserRecord;
