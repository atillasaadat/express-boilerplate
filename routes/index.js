var express = require('express'),
  router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    title: 'express-boilerplate',
    resources: 'index'
  });
});

module.exports = router;
