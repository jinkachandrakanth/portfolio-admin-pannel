import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
  },
  icon: {
    type: String,
  },
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;