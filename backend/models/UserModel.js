import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserModel = new Schema({
  // all
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String, // Specify the type for the password field
    required: true,
  },
  email: {
    type: String, // Fix the case of 'string' to 'String'
    required: true,
  },
  role: ['president', 'devPresident', 'cpdPresident', 'cbdPresident'], // Strings should be in quotes
  division: ['cpd', 'dev'], // Strings should be in quotes
});

export default mongoose.model('UserModel', UserModel);
