const Bilingual = require('../../models/tryout');

exports.getBilingualDocs = (req, res) => {
  Bilingual.find({})
    .limit(10)
    .exec((error, docs) => {
      if (docs) {
        return res.status(200).json({ docs });
      }
    });
};
