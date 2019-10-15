// $(document).ready(() => {};

  $('#go-up').on('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    });
//go-up

// let momentAddDays = (dateStr, numDay) => {
//   return moment(dateStr, 'DD.MM.YYYY').substract
// }

// Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }
//
// var date = new Date();
//
// alert(date.addDays(5));

//search

// var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
// console.log(utc);

// var x = 30.toDate();
// console.log(x);

// var utc1 = utc + x;
// console.log(utc1);








// products []: { id:number, name:string, price:number,
//                  brand:string, imgSrc: string }
// users []: { name:string, email:string, age:number, cart:[] }
// admin


class Product {
    constructor(name, price, brand, imgSrc) {
        this.name = name;
        this._price = price;
        this.brand = brand;
        this.imgSrc = imgSrc;
    }

    set price(newPrice) {
        if(typeof newPrice === 'number' && newPrice > 0) {
            this._price = newPrice;
        }
    }
    get price() {
        return this._price;
    }
    static generateId() {
        return 5;
    }
    log() {
        console.log(`product ${this.name} (${this.id}): ${this.price}`);
    }
    showPrice() {
        console.log(this.price);
    }
}

class User {
    constructor(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.cart = [];
    }
    addCart(product) {
        this.cart.push(product);
    }
    showCart() {
        console.table(this.cart);
    }
};

// class Admin extends User {
//     constructor(name, email, age, isAdmin) {
//         super(name, email, age);
//         this.isAdmin = isAdmin;
//     }
//     checkUser() {
//         return this.isAdmin;
//     }
// }




// $('document').ready(function() {
//   loadProducts();
// });
//
// function loadProducts() {
//   $.getJSON('products.json', function(data) {
//     console.log(data);
//     var out = '';
//     for(var key in data) {
//       out+='<div class="single-goods">';
//       out+='<h3>'+data[key]['name']+'</h3>';
//       out+='<p>'+data[key]['cost']+'</p>';
//       out+='<img src="'+data[key].image+'">';
//       out+='</div>';
//     }
//     $('#products').html(out);
//   })
// }
