let dataObj = {};

let renderCurrencies = currencies => {
  let currenciesStr = ``;
  for(let currencyIndex in currencies) {
    let currency = currencies[currencyIndex];
    currenciesStr += `<tr class="currency-${currencyIndex}">
        <td>${+currencyIndex+1}</td>
        <td>${currency.r030}</td>
        <td>${currency.txt}</td>
        <td>${currency.rate.toFixed(2)}</td>
        <td>${currency.cc}</td>
        <td>${currency.exchangedate}</td>
      </tr>`;
  }
  $('table.currencies tbody').html(currenciesStr);
};
//render currencies

let getCurrencies = dateValue => {
    if(dataObj[dateValue]) {
        renderCurrencies(dataObj[dateValue]);
        return;
    }
    $.ajax({
        url: `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&date=${dateValue}`,
        method: 'GET',
        error: (e) => {
            console.log(e);
        },
        success: (data) => {
            dataObj.data = data;
            dataObj[dateValue] = data;
            console.log(dataObj);
            renderCurrencies(data);
        }
    });
};
//get currencies

let saveDate = dateStr => {
        localStorage.setItem('dateStr', dateStr);
};
//save date

let getSavedDate = () => {
          return localStorage.getItem('dateStr') || false;
};
//get saved date

$(document).ready(() => {
    let savedDate = getSavedDate();
    let thisDate;
    if(savedDate) {
        thisDate = savedDate;
//document ready

      let dateToPaste = savedDate.substring(0,4) + '-' + savedDate.substring(4, 6) + '-' + savedDate.substring(6, 8);
        $('#date').val(dateToPaste);
    } else {
        let dateNow = new Date();
        let dateArr = [dateNow.getFullYear() + '', (+dateNow.getMonth() + 1) + '', (dateNow.getDate()) + ''];
//date to paste, date now, date arr

        if((dateArr[1]+'').length < 2) {
            dateArr[1] = '0' + dateArr[1];
        }
        if((dateArr[2]+'').length < 2) {
            dateArr[2] = '0' + dateArr[2];
        }
        thisDate = dateArr.join('');
  }
//this date

  getCurrencies(thisDate);

  $('#date').change(e => {
        let dateStr = $(e.currentTarget).val();
        if(dateStr) {
            dateStr = dateStr.split('-').join('');
            getCurrencies(dateStr);
            saveDate(dateStr);
        }
    });
//get currencies

  $('#go-up').on('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    });
//go-up

    $('#search').on('keyup', (e) => {
        let value = $(e.currentTarget).val().trim();
        if(value) {
            let dataToRender = dataObj.data.filter(el => {
                return el.txt.toLowerCase().indexOf(value.toLowerCase()) > -1;
            });
            renderCurrencies(dataToRender);
        } else {
            renderCurrencies(dataObj.data);
        }
    })
});

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




//  products []: { id:number, name:string, price:number,
//                  brand:string, imgSrc: string }
//  users []: { name:string, email:string, age:number, cart:[] }
// admin

/*
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
}

class Admin extends User {
    constructor(name, email, age, isAdmin) {
        super(name, email, age);
        this.isAdmin = isAdmin;
    }
    checkUser() {
        return this.isAdmin;
    }
}*/
