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
console.log(charge, flesh, mouse);


var obj = {
  "12341" : {
    "image" : "images/charge.jpg",
    "name" : "charge",
    "cost" : 12,
    "description" : "ch"
  },
  "12342" : {
    "image" : "images/flesh.jpg",
    "name" : "flesh",
    "cost" : 10,
    "description" : "fl"
  },
  "12343" : {
    "image" : "images/mouse.jpg",
    "name" : "mouse",
    "cost" : 15,
    "description" : "mo"
      }
};

function loadProducts() {
    // console.log(obj);
    var out = '';
    for(var key in obj) {
      out+='<div class="products">';
      out+='<img src="'+obj[key].image+'">';
      out+='<h2>'+obj[key]['name']+'</h2>';
      out+='<p> Price: '+obj[key]['cost']+'</p>';
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

function checkCart () {
  //checking for a cart in localStorage
  if (localStorage.getItem('cart') != null) {
  cart = JSON.parse(localStorage.getItem('cart'));
  }
}

function showMiniCart() {
  // show content of Cart
  var out = '';
  for(var w in cart){
    out += w + ' --- '+cart[w]+'<br>';
  }
  $('#mini-cart').html(out);
}

var cart1 = {}; //cart1

var goods = obj; //all goods in array
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

function checkCart () {
  //checking for a cart in localStorage
  if (localStorage.getItem('cart') != null) {
  cart = JSON.parse(localStorage.getItem('cart'));
  }
}

function saveCartToLS() {
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
