import { model, Schema, Types } from 'mongoose';
import { CommercialLinkType } from '../types';
import User from './User';

const CommercialLinkSchema = new Schema<CommercialLinkType>({
  event: {
    type: [String],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'Такого пользователя нет !',
    },
  },
  description: String,
  shortUrl: String,
  fullLink: String,
});

const CommercialLink = model('CommercialLink', CommercialLinkSchema);
export default CommercialLink;
