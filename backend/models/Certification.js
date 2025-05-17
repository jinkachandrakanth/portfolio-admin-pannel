import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Certification = mongoose.model('Certification', certificationSchema);

export default Certification;