// constructor
function ItemLibrary() {
  this.items = [];
  this.id = 0;
}

// methods
ItemLibrary.prototype.addItem = function(name) {
  var newItem = {name: name, id: this.id};
  this.items.push(newItem);
  this.id += 1;
};

// create some instances
var storage = new ItemLibrary();
storage.addItem('Noodles');
storage.addItem('Tomatoes');
storage.addItem('Peppers');

// filters items to find matching ID
function itemFilter(params){
  var itemId = +params.id;
  return storage.items.filter(function(listItem){
    return listItem.id === itemId
  });
}

//add item post request
function createAddItem(body){
  var name = body.name;
  storage.addItem(name);
  return {items: storage.items}
}

//update item or add if doesn't exist
function updateItem(params, body, itemId){
  var itemId = +params.id;
  var item = itemFilter(itemId);
  if (item.length > 0){
    for (key in body) {
      if (key === 'name') {
        item[0].name = body.name
      }
    }
    return {item:item[0], message: "Item updated."}
  }else {
      storage.addItem(body.name, itemId);
      var newItem = storage.items[itemId]
      return{item:newItem, message: "Item added to list."};
  }
}

//delete items
function deleteItem(params){
  var itemId = +params.id;
  var item = itemFilter(itemId);
  storage.items.splice(itemId, 1)
  return{items:storage.items, message: "Item removed from list."}
}


module.exports = {
  ItemLibrary:ItemLibrary,
  storage:storage,
  itemFilter:itemFilter,
  updateItem:updateItem,
  deleteItem: deleteItem,
  createAddItem:createAddItem,
};
