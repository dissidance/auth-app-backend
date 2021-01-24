import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
}, {
  collection: 'users',
  timestamps: true,
});

// eslint-disable-next-line func-names
userSchema.virtual('publicData').get(function (this: { email: string }) {
  return {
    email: this.email,
  };
});

export default mongoose.model('users', userSchema);
