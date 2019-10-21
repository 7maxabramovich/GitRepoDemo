var cart = {}; //my cart

$('document').ready(function() {
  loadProducts();
  checkCart();
  showMiniCart();
  showCart();
});


// $('h1').fadeOut(3000).fadeIn(3000);
   // $('h1').slideUp(3000).slideDown(3000);
   // $('h1').delay(2000).hide(3000).show(3000);
   $('h1').fadeTo(3000, 0.3);


// debugger;

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





//
