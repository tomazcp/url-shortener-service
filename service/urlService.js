const urlRepo = require('../repository/urlRepo');
const dns = require('dns');
const PROTOCOL_REGEX = /[^https?:\/\/](.*)\.[a-z]+/gi;

const getHost = (url) => {
  const matches = url.match(PROTOCOL_REGEX);
  if (!matches) {
    throw Error('Invalid Url');
  }

  return matches[0];
};

exports.shortenUrl = (url, cb) => {
  if (url === null || url === 'undefined') {
    return cb(new Error('Invalid url'));
  }
  const host = getHost(url);
  dns.lookup(host, (err, addresses, family) => {
    if (err) {
      console.log(`DNS Lookup FAILED: ${host}`);
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
