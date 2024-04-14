import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'E-Mail is Mandatory'],
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name is Mandatory'],
    minLength: [3, 'First Name must be of atleast 3 characters in length'],
    maxLength: [32, 'First Name can be of at most 32 characters in length'],
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: [32, 'Last Name can be of at most 32 characters in length'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password is Mandatory'],
    minLength: [6, 'Password must be of atleast 6 characters in length'],
  },
});

export const User = mongoose.model('User', UserSchema);
