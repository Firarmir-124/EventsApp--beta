import { model, Schema } from 'mongoose';
import { HashtagType } from '../types';

const HashtagSchema = new Schema<HashtagType>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Hashtag = model('Hashtag', HashtagSchema);
export default Hashtag;
