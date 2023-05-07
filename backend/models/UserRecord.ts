import { model, Schema } from 'mongoose';
import { RecordUserType } from '../types';

const RecordUserSchema = new Schema<RecordUserType>({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
