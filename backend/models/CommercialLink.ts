import { model, Schema } from 'mongoose';
import { CommercialLinkType } from '../types';

const CommercialLinkSchema = new Schema<CommercialLinkType>({
  event: {
    type: [String],
    required: true,
  },
  title: String,
  description: String,
  shortUrl: String,
  fullLink: String,
});

const CommercialLink = model('CommercialLink', CommercialLinkSchema);
export default CommercialLink;
