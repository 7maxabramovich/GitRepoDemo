var cart = {}; //my cart

$('document').ready(function() {
  loadProducts();
  checkCart();
  showMiniCart();
  showCart();
});


class Obj {
    constructor(cost, name, image, description) {
        this.cost = cost;
        this.name = name;
        this.image = image;
        this.description = description;
      }
};

var charge = new Obj(12, "charge", "images/charge.jpg", "ch");
var flesh = new Obj(10, "flesh", "images/flesh.jpg", "fl");
var mouse = new Obj(15, "mouse", "images/mouse.jpg", "mo");

var obj1 = {"12341": charge, "12342": flesh, "12343": mouse};


let loadProducts = () => {
    // console.log(obj1);
    var out = '';
    for(var key in obj1) {
      out+='<div class="products">';
      out+='<img src="'+obj1[key].image+'">';
      out+='<h2>'+obj1[key]['name']+'</h2>';
      out+='<p> Price: '+obj1[key]['cost']+'</p>';
      out+='<button class="add-to-cart" data-art="'+key+'">Buy Now, Add to Cart</button>';
      out+='</div>';
    }
    $('#products').html(out);
    $('button.add-to-cart').on('click', addToCart);
}

function addToCart() {
  //add products in cart
  var articul = $(this).attr('data-art');
  if (cart[articul] !=undefined) {
    cart[articul]++;
  }
  else {
    cart[articul] = 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  // console.log(cart);
  showMiniCart();
  showCart();
}

let checkCart = () => {
  //checking for a cart in localStorage
  if (localStorage.getItem('cart') != null) {
  cart = JSON.parse(localStorage.getItem('cart'));
  }
}

let showMiniCart = () => {
  // show content of Cart
  var out = '';
  for(var w in cart){
    out += w + ' --- '+cart[w]+'<br>';
  }
  $('#mini-cart').html(out);
}

var cart1 = {}; //cart1

var goods = obj1; //all goods in array
// console.log(goods);

checkCart ();
// console.log(cart);
showCart(); //I bring the goods to the page
showMiniCart();

function showCart() {
  if ($.isEmptyObject(cart)) {
    //cart is empty
    var out = 'Cart is empty. Add goods in cart';
    $('#my-cart').html(out);
  }
  else {
      var out = '';
      for(var key in cart){
        out += '<button class="delete" data-art="'+key+'">x</button>';
        out += '<img src="'+goods[key].image+'" width="48">';
        out += goods[key].name;
        out += '<button class="minus" data-art="'+key+'">-</button>';
        out += cart[key];
        out += '<button class="plus" data-art="'+key+'">+</button>';
        out += cart[key]*goods[key].cost;
        out += '<br>';
      }
      $('#my-cart').html(out);
      $('.plus').on('click', plusGoods);
      $('.minus').on('click', minusGoods);
      $('.delete').on('click', deleteGoods);
  }
}

function deleteGoods() {
  var articul = $(this).attr('data-art');
  delete cart[articul];
  saveCartToLS();//save cart to localStorage
  showCart();
  showMiniCart();
}

function minusGoods() {
  var articul = $(this).attr('data-art');
  if (cart[articul]>1) {
    cart[articul]--;
  }
  else {
    delete cart[articul];
  }
  saveCartToLS();//save cart to localStorage
  showCart();
  showMiniCart();
}

function plusGoods() {
  var articul = $(this).attr('data-art');
  cart[articul]++;
  saveCartToLS();//save cart to localStorage
  showCart();
  showMiniCart();
}

checkCart = () => {
  //checking for a cart in localStorage
  if (localStorage.getItem('cart') != null) {
  cart = JSON.parse(localStorage.getItem('cart'));
  }
}

let saveCartToLS = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

$('#go-up').on('click', () => {
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
      });
  });
//go-up





// debugger;





//take needed number from 0 to size-1
let getRandomNumber = (size) => {
  return Math.floor(Math.random() * size);
};

//count distance from click(event) to treasure(target)
let getDistance = (e, target) => {
  let diffX = e.offsetX - target.x;
  let diffY = e.offsetY - target.y;
  return Math.sqrt((diffX * diffX) + (diffY * diffY));
};

//take for distance string hint
let getDistanceHint = (distance) => {
  if (distance < 10) {
    return 'very very hot';
  } else if (distance < 20) {
      return 'very hot';
  } else if (distance < 40) {
      return 'hot';
  } else if (distance < 80) {
      return 'warm';
  } else if (distance < 160) {
      return 'cold';
  } else if (distance < 320) {
      return 'very cold';
  } else {
      return 'very very cold';
  }
};

//create variables
let clicks = 0;
let width = 400;
let height = 400;

//variables position treasure
let target = {x: getRandomNumber(width), y: getRandomNumber(height)};

//add element img handler click
$('#map').click(function (e) {
  clicks++;

  //take distance from the place of click to the treasure
  let distance = getDistance(e, target);

//transform distance in hint
let distanceHint = getDistanceHint(distance);

//create in element #distance new hint
$('#distance').text(distanceHint);

//game over

// let z = 5;
// if (clicks > z) {
// alert('game over. press key f5');
// }
// console.log(z - clicks);

console.log(target);
console.log('x: ' + e.offsetX, 'y: ' + e.offsetY);

//if click was enough near, congrats with victory
if (distance < 8) {
  alert('treasure is found! Numbers of clicks: ' + clicks);
}
});




// function Car(x, y) {
//   this.x = x;
//   this.y = y;
// };
// Car.prototype.draw = function () {
//       let carHtml = '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-ZNzQMWLzlKKtLDIHAn45xMrTLgwH2rhdFZfp8nhq4NZ3AJrZQ" width=100 height=100>';
// this.carElement = $(carHtml);
//   this.carElement.css({
//     position: "absolute",
//     left: this.x,
//     top: this.y
//   });
//
//   $("body").append(this.carElement);
// };
//       Car.prototype.moveRight = function () {
//         this.x += 5;
//         this.carElement.css({
//           left: this.x,
//           top: this.y
//         });
//       };
// Car.prototype.moveLeft = function () {
//   this.x -= 5;
//   this.carElement.css({
//     left: this.x,
//     top: this.y
//   });
// };
// Car.prototype.moveUp = function () {
//   this.y -= 5;
//   this.carElement.css({
//     left: this.x,
//     top: this.y
//   });
// };
// Car.prototype.moveDown = function () {
//   this.y += 5;
//   this.carElement.css({
//     left: this.x,
//     top: this.y
//   });
// };
//         let tesla = new Car(550, 20);
//         let nissan = new Car(450, 200);
// tesla.draw();
// nissan.draw();


// function speak() {
//   console.log(this.sound + '! my name is ' + this.name + '!');
// };
//
// let cat = {
//   name: 'cat',
//   sound: 'miau',
//   speak: speak
// };
//
// cat.speak();

// $('html').click(x = (e) => {
//   $('#header1').offset({left: e.pageX, top: e.pageY});
// });


    // let newHeader = prompt('enter new h1');
    // $('#header1').text(newHeader);
// for(i = 1; i < 3; i++) {
//   let newHeader = prompt('enter new <p>');
//   $('body').append('<p>' + i + ' ' + newHeader + '</p>');
// };


// let y = (a, b) => {
// if (a === b) return true;
// if (a == null || b == null) return false;
//   if (a.length != b.length) return false;
//   for(var i = 0; i < a.length; i++) {
//   if(a[i] !== b[i])
//    return false;
// };
// return true;
// };
// console.log(y([1, 2, 3, 4], [1, 2, 3, 4, 5]));
// проверка массивов на равенство(check arrays for equals)

// var x = (w) => {
//   return w[Math.floor(Math.random() * w.length)];
// };
//
// var r = [1, 2, 3, 4];
//
// console.log(x(r));
//random items from arrays
//






//
