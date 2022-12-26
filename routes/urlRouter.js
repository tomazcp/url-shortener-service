const router = require('express').Router();
const { postUrl, goTo } = require('../controllers/urlController.js');

router.get('/:shortUrl', goTo);
router.post('/', postUrl);

module.exports = router;
