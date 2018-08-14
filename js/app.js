'use strict';
console.log('js linked');

//create constructor for products

function Product(filename, name){
  this.filename = filename;
  this.votes = 0;
  this.seen = 0;
  this.name = name;
  Product.allProducts.push(this);
}

//create array to hold all Product objects
Product.allProducts = [];

//create variable to count total votes
var totalVotes = 0;

//create new product instances for each product img
//create variables for the 3 products that will be displayed at one time
var product1 = new Product('img/bag.jpg', 'bag');
var product2 = new Product('img/banana.jpg', 'banana');
var product3 = new Product('img/bathroom.jpg', 'bathroom');
new Product('img/boots.jpg', 'boots');
new Product('img/breakfast.jpg', 'breakfast');
new Product('img/bubblegum.jpg', 'bubblegum');
new Product('img/chair.jpg', 'chair');
new Product('img/cthulhu.jpg', 'creature');
new Product('img/dog-duck.jpg', 'dogduck');
new Product('img/dragon.jpg', 'dragon');
new Product('img/pen.jpg', 'pen');
new Product('img/pet-sweep.jpg', 'petsweep');
new Product('img/scissors.jpg', 'scissors');
new Product('img/shark.jpg', 'shark');
new Product('img/sweep.png', 'sweep');
new Product('img/tauntaun.jpg', 'blanket');
new Product('img/unicorn.jpg', 'unicorn');
new Product('img/usb.gif', 'usb');
new Product('img/water-can.jpg', 'watercan');
new Product('img/wine-glass.jpg', 'wineglass');

//create array to hold index for the 3 products; used to ensure images are not displayed 2x in a row
var productIndex = [];

//create function to randomly generate indexes
function randIndex() {
  var randIndex = Math.floor(Math.random() * Product.allProducts.length);
  product1 = Product.allProducts[randIndex];
  do {
    var secondProductIndex = Math.floor(Math.random() * Product.allProducts.length);
    var thirdProductIndex = Math.floor(Math.random() * Product.allProducts.length);

    //prevents the display of duplicate images
  } while (randIndex === secondProductIndex ||
    randIndex === thirdProductIndex ||
    secondProductIndex === thirdProductIndex);

  product2 = Product.allProducts[secondProductIndex];
  product3 = Product.allProducts[thirdProductIndex];
  displayThreeImg();
}

//create function to check with array to ensure the same products are not shown 2x in a row then display new product images
//add to counter to product for the number of times seen
function displayThreeImg() {
  if (productIndex.includes(product1.name) || productIndex.includes(product2.name)|| productIndex.includes(product3.name)) {
    randIndex();
  } else {
    productIndex[0] = product1.name;
    productIndex[1] = product2.name;
    productIndex[2] = product3.name;
    product1.seen++;
    product2.seen++;
    product3.seen++;
    img1.src = product1.filename;
    img2.src = product2.filename;
    img3.src = product3.filename;
  }
}

//create variables for the three images
var img1 = document.getElementsByTagName('img')[0];
var img2 = document.getElementsByTagName('img')[1];
var img3 = document.getElementsByTagName('img')[2];

//display results after 25 votes
function results() {
  if (totalVotes === 25) {
    var resultsList = document.getElementById('results');
    var title = document.createElement('h2');
    title.textContent = 'Results';
    resultsList.appendChild(title);
    for (var i = 0; i < Product.allProducts.length; i++) {
      var results = document.getElementById('results');
      var votes = document.createElement('li');
      votes.textContent = `${Product.allProducts[i].votes} votes for the ${Product.allProducts[i].name}`;
      results.appendChild(votes);
    }
  }
}

//display random initial product images
randIndex();

//event listeners
//where to listen? 3 images
//listen for click
//do what? add vote
img1.addEventListener('click', function() {
  product1.votes++;
  totalVotes++;
  console.log('Third product selected');
  randIndex();
  results();
});

img2.addEventListener('click', function() {
  product2.votes++;
  totalVotes++;
  console.log('Second product selected');
  randIndex();
  results();
});

img3.addEventListener('click', function() {
  product3.votes++;
  totalVotes++;
  console.log('First product selected');
  randIndex();
  results();
});






