const urlService = require('../service/urlService');
const ERR_RESPONSE = { error: 'invalid url' };

exports.postUrl = (req, res) => {
  const { url } = req.body;

  urlService.shortenUrl(url, (err, data) => {
    if (err) {
      return res.json(ERR_RESPONSE);
    }

    return res.json({
      original_url: data.originalUrl,
      short_url: data.shortUrl,
    });
  });
};

exports.goTo = (req, res) => {
  const shortUrl = req.params.shortUrl;
  console.log(shortUrl);
  const originalUrl = urlService.getOriginalUrl(shortUrl);
  console.log(originalUrl);
  return res.redirect(originalUrl);
};
