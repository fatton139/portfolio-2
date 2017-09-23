// Generated by CoffeeScript 1.12.7
(function() {
  var database, express, item, router;

  express = require('express');

  router = express.Router();

  database = require('../routes/database');

  item = require('../routes/item');

  router.get('/', function(req, res, next) {
    database.getDb().collection('collection').find({}).toArray(function(err, result) {
      res.render('collectiondata', {
        itemKeys: Object.keys(result),
        items: result
      });
    });
  });

  module.exports = router;

}).call(this);
