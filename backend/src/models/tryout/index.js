const mongoose = require('mongoose');

const bilingualSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  author: {
    type: String,
  },
});

module.exports = mongoose.model('Bilingual', bilingualSchema);
