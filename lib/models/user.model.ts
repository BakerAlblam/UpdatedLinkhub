import { Schema, model, models } from 'mongoose';

const SocialLinkSchema = new Schema({
  platform: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  background: {
    type: String,
    default: 'default',
  },
  socialLinks: [SocialLinkSchema], // Embedding social links within the user schema
});

const User = models?.User || model('User', UserSchema);

export default User;
