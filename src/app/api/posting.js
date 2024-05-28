import mongoose from 'mongoose';
const posting = new mongoose.Schema({
  jobTitle: String,
  datePosted: String,
  hiringOrganization: String,
  streetAddress: String,
  addressLocality: String,
  addressRegion: String,
  language: String,
  minCompValue: String,
  maxCompValue: String,
  compTimeUnit: String,
  workHours: String,
  specialCommitments: String,
  email: { type: String, required: true },
  jobPageId: { type: String, unique: true }, // unique prevents duplicate job postings from web scrapers
  employmentType: String,
  employmentSubType: String,
  startTime: String,
  benefits: String,
  vacancies: Number,
  verified: Boolean,
  validThrough: { type: Date, required: true },
  description: String,
  paid: Boolean,
  site1: Boolean,
  site2: Boolean,
  site3: Boolean,
  site4: Boolean,
  site5: Boolean,
});

export default posting;
