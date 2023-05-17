import { model, Schema, Types } from 'mongoose';
import User from './User';
import EventPlan from './EventPlan';

const FavoritesSchema = new Schema({
  event: {
    type: [
      {
        list: {
          type: Schema.Types.ObjectId,
          ref: 'EventPlan',
          validate: {
            validator: async (value: Types.ObjectId) => EventPlan.findById(value),
            message: 'Такого евента нет !',
          },
        },
        show: {
          type: Boolean,
          default: false,
        },
        _id: String,
      },
    ],
    required: true,
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
});

const Favorites = model('Favorites', FavoritesSchema);
export default Favorites;
