const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  availableDate: { type: Date, required: true },
  metadata: { type: Object, required: true },
  contents: { type: Object, required: true },
  credits: { type: Object, required: true },
  parentalRatings: { type: Object, required: true },
  images: { type: Object, required: true },
  categories: { type: Array, required: true },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;