import { Schema, model, models } from 'mongoose';

const LinkSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
});

const Link = models?.Link || model('Link', LinkSchema);

export default Link;
