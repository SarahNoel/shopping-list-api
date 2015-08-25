var express = require('express');
var router = express.Router();
var utilities = require('../logic/utilities')

var allItems = utilities.storage.items

//redirect to items
router.get('/', function(req, res, next) {
  res.redirect('/items');
});

//see items
router.get('/items', function(req, res, next) {
  res.json({items:allItems});
});

//post request- add items
router.post('/items', function(req, res) {
  var created = utilities.createAddItem(req.body)
  res.json(created);
});

//see item by id
router.get('/item/:id', function(req, res){
  var item = utilities.itemFilter(req.params);
  res.json({item:item});
});

//update item by id
router.put('/item/:id', function(req, res){
  var change = utilities.updateItem(req.params, req.body);
  res.json(change)
  });

//delete item by id
router.delete('/item/:id', function(req, res){
  var deletion = utilities.deleteItem(req.params);
  res.json(deletion);
 })



module.exports = router;
