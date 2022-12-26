const urlRepo = require('../repository/urlRepo');
const dns = require('dns');
const PROTOCOL_REGEX = /^https?:\/\//i;

const removeProtocol = (url) => {
  return url.replace(PROTOCOL_REGEX, '');
};

exports.shortenUrl = (url, cb) => {
  if (url === null || url === 'undefined') {
    return cb(new Error('Invalid url'));
  }
  const noProtocolUrl = removeProtocol(url);
  dns.lookup(noProtocolUrl, (err, addresses, family) => {
    if (err) {
      console.log(`DNS Lookup FAILED: ${noProtocolUrl}`);
      return cb(err);
    }

    urlRepo.storeUrl(url, (data) => {
      return cb(null, { originalUrl: data.originalUrl, shortUrl: data._id });
    });
  });
};

exports.getOriginalUrl = (shortUrl, done) =>
  urlRepo.getByShortUrl(shortUrl, (err, data) => {
    if (err) {
      return done(err);
    }
    return done(null, data);
  });
