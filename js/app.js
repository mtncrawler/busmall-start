'use strict';
console.log('js linked');

//create constructor for products
function Product(filename, name, votes = 0, seen = 0){
  this.filename = filename;
  this.votes = votes;
  this.seen = seen;
  this.name = name;
  Product.allProducts.push(this);
}

//create array to hold all Product objects
Product.allProducts = [];

//create array to hold index for the 3 products; used to ensure images are not displayed 2x in a row
var productIndex = [];

//create variable to count total votes
var totalVotes = 0;

//display total votes counter
var titleHeader = document.getElementById('titleHeader');
var voteCounter = document.createElement('h2');
voteCounter.id = 'totalVotes';
voteCounter.textContent = `${totalVotes}/25 Votes`;
titleHeader.appendChild(voteCounter);

var storedProductVotes = JSON.parse(localStorage.getItem('products'));
if (storedProductVotes) {
  for (var i = 0; i < storedProductVotes.length; i++) {
    new Product (storedProductVotes[i].filename, storedProductVotes[i].name, storedProductVotes[i].votes, storedProductVotes[i].seen);
  }
} else {
  //create new product instances for each product img
  new Product('img/bag.jpg', 'bag');
  new Product('img/banana.jpg', 'banana');
  new Product('img/bathroom.jpg', 'bathroom');
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
}

//create variables for the 3 products that will be displayed at one time
var product1 = Product.allProducts[0];
var product2 = Product.allProducts[1];
var product3 = Product.allProducts[2];

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
//add to counter the number of times product seen
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
    voteCounter.textContent = `${totalVotes}/25 Votes`; //update votes counter
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
    displayChart();

    percentClicked();
    //add list items to display votes for each product
    for (var i = 0; i < Product.allProducts.length; i++) {
      var results = document.getElementById('results');
      var votes = document.createElement('li');
      votes.textContent = `${Product.allProducts[i].votes} votes for the ${Product.allProducts[i].name} with ${clicked[i]}%`;
      results.appendChild(votes);
    }
  }
}

//calculate and store percentage clicked
var clicked = [];
function percentClicked() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    var calcClicked = (Product.allProducts[i].votes)/(Product.allProducts[i].seen);
    clicked.push(calcClicked.toFixed(2));
  }
}

//function to display chart by filling name and votes array then chartjs
function displayChart() {
  //create arrays with product names and votes to build chartjs
  var productNames = [];
  var productVotes = [];

  for (var i = 0; i < Product.allProducts.length; i++) {
    productNames.push(Product.allProducts[i].name);
    productVotes.push(Product.allProducts[i].votes);
  }

  //add votes to local storage
  localStorage.setItem('products', JSON.stringify(Product.allProducts));

  //create chartjs to display votes for each product
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames, //name of each product
      datasets: [{
        label: '# of Votes',
        data: productVotes, //votes for each product
        backgroundColor: [
          '#2377e6', '#21594f', '#886fea', '#ea34a9', '#a1de38',
          '#ddbdee', '#a608e3', '#b55e72', '#81ec92', '#197cad',
          '#bbaf61', '#d2fa0e', '#03f7c1', '#43d1ec', '#8991fd',
          '#ea9328', '#96ef88', '#8729ec', '#f4bb06', '#7f52e1'
        ],
        borderColor: 'rgb(0,0,0)',
        borderWidth: 1.5
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            suggestedMax: 5
          }
        }]
      }
    }
  });
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
