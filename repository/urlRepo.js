const urls = new Map();
let counter = 0;

const storeUrl = (originalUrl, cb) => {
  new Promise((resolve, _) => {
    counter += 1;
    return resolve(counter);
  }).then((data) => {
    urls.set(`${data}`, originalUrl);
    return cb(data);
  });
};

const getByShortUrl = (shortUrl) => {
  return urls.get(shortUrl);
};

module.exports = { storeUrl, getByShortUrl };
