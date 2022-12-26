const Url = require('../models/url');

const storeUrl = (originalUrl, done) => {
  new Url({
    originalUrl,
  }).save((err, data) => {
    if (err) {
      console.log(err);
      return done(null);
    }

    return done(data);
  });
};

const getByShortUrl = (shortUrl, done) => {
  return Url.findById(shortUrl, (err, data) => {
    if (err) {
      return done(err);
    }
    return done(null, data.originalUrl);
  });
};

module.exports = { storeUrl, getByShortUrl };
