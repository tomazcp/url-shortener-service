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
      return cb(err);
    }

    urlRepo.storeUrl(url, (id) => {
      return cb(null, { originalUrl: url, shortUrl: id });
    });
  });
};

exports.getOriginalUrl = (shortUrl) => urlRepo.getByShortUrl(shortUrl);
