'use strict';

//create constructor for goats

function Product(filename){
  this.filename = filename;
  this.votes = 0;
  this.seen = 0;
  Product.allProducts.push(this);

}