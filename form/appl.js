  function valid (submitForm) {
    var fail = false;
    var firstName = form.firstName.value;
    var email = form.email.value;
    var age = form.age.value;
    var picture = form.picture.value;
    var adr_pattern = /[0-9a-z_.-]+@[0-9a-z_.-]+\.[a-z]{2,5}/i;
        if(firstName == "" || firstName == " ")
      fail = "you did not enter your name";
    else if(adr_pattern.test(email) == false)
      fail = "you entered your email incorrectly";
    else if(age == "" || age == " " || age == "0")
      fail = "you entered your age incorrectly";
    else if(picture == "" || picture == " ")
      fail = "you did not enter picture";
    if(fail)
      alert(fail);
    else alert('ok');
  }
// form validation

  let form = document.getElementById('submitForm');
  let users = [];
  let countries = [];
//let

    let deleteElement = e => {
      if($(e.target).hasClass('remove-btn')) {
        let itemToRemoveIndex = $(e.target).parents('tr').index();
        users.splice(itemToRemoveIndex, 1);
        renderUsers(users);
      }
  };
// deleting data from a string and from an array

    let renderUsers = users => {
      let htmlStr = ``;
      for(let index in users) {
          htmlStr += `<tr>
              <td>${+index+1}</td>
              <td>${users[index].firstName}</td>
              <td>${users[index].email}</td>
              <td>${users[index].age}</td>
              <td><img src="${users[index].picture}"></td>
              <td><button class="remove-btn">Remove</button></td>
  					</tr>`;
          }
  		$('#firstName, #email, #age, #picture').val('');
      $('table.users-table tbody').html(htmlStr);
      if($('table.users-table tbody tr').length) {
        $('table.users-table').show();
      } else {
        $('table.users-table').hide();
      }
  };
// render users

  let addUser = e => {
      e.preventDefault();
      // console.log('We are starting...');
      let userObject = {
  				firstName: $('#firstName').val(),
          email: $('#email').val(),
          age: +$('#age').val(),
          picture: $('#picture').val(),
      };
      if(!userObject.firstName || !userObject.email || !userObject.age || !userObject.picture) {
          return;
      }
      users.push(userObject);
      renderUsers(users);
      console.log(users);
  };
// add users

let loadCurrencies = () => {
    $.ajax({
      url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',
      method: 'GET',
      error: (e) => {
          console.log(e);
      },
      success: (data) => {
          console.log(data);
          let currenciesStr = ``;
          for(let item in data) {
            let currency = data[item];
            currenciesStr += `<tr class="currency-${item}">
                <td>${+item+1}</td>
                <td>${currency.r030}</td>
                <td>${currency.cc}</td>
                <td>${currency.txt}</td>
                <td>${currency.rate.toFixed(2)}</td>
    					</tr>`;
          }
          $('table.currencies tbody').html(currenciesStr);
          $('table.currencies').show();
      }
  });
};
// load currencies

let renderCountriesHtml = (countries) => {
    let htmlStr = '';
    let bordersTranslation = {};
    let altSpellingsTranslation = {};
          for(let country of countries) {
            bordersTranslation[country['alpha3Code']] = country['name'];
            altSpellingsTranslation[country['alpha2Code']] = country['name'];
        }
        for(let country of countries) {
            country.borderNames = [];
            country.altSpellingsNames = [];
          for(let border of country.borders) {
              country.borderNames.push(bordersTranslation[border])
          }
            for(let altSpellingser of country.altSpellings) {
              country.altSpellingsNames.push(altSpellingsTranslation[altSpellingser])
        }
            let currenciesArray = country.currencies.map(currency => currency.name);
            let languagesArray = country.languages.map(language => language.name);
              htmlStr += `<tr>
                <td>${country.name}</td>
                <td>${country.population}</td>
                <td>${country.area}</td>
                <td>${country.capital}</td>
                <td>${currenciesArray.join(', ')}</td>
                <td>${languagesArray.join(', ')}</td>
                <td>${country.borderNames.join(', ')}</td>
                <td>${country.altSpellingsNames.join(', ')}</td>
                <td><img height='50' src='${country.flag}'</td>
    					</tr>`;
          }
          $('table.countries tbody').html(htmlStr);
          $('table.countries').show();
};
// render countries

let loadCountries = e => {
    $.ajax({
      method: 'GET',
      url: 'https://restcountries.eu/rest/v2/all',
      success: (response) => {
        countries = response;
        sortTable();
      }
  });
};
//load countries

let sortTable = e => {
          let savedSort = localStorage.getItem('currencies.sort');
    let dataAttr = '';
    let isActive = '';
    let isReversed = '';

    if(!e) {
        if(savedSort) {
            savedSort = JSON.parse(savedSort).data;
            dataAttr = savedSort[0];
            isActive = savedSort[1];
            isReversed = savedSort[2];
        } else {
            renderCountriesHtml(countries);
            return;
        }
    } else {
        dataAttr = $(e.currentTarget).attr('data-attr');
        isActive = $(e.currentTarget).hasClass('active');
        isReversed = $(e.currentTarget).hasClass('reversed');
    }

    if(dataAttr) {
        localStorage.setItem('currencies.sort', JSON.stringify({data: [dataAttr, isActive, isReversed]}));
    }
    $('th.sortable').removeClass('active');
    $('th.sortable').removeClass('reversed');
    if(e) {
        $(e.currentTarget).addClass('active');
    } else if(dataAttr) {
        $(`.sortable[data-attr=${dataAttr}]`).addClass('active');
    }
    let sortedCountries = countries.sort((a, b) => {
        return a[dataAttr] > b[dataAttr];
    });
    if(isActive && !isReversed) {
        if(e) {
            $(e.currentTarget).addClass('reversed');
        } else if(dataAttr && isReversed) {
            $(`.sortable[data-attr=${dataAttr}]`).addClass('reversed');
        }
        renderCountriesHtml(sortedCountries.reverse());
    } else {
        renderCountriesHtml(sortedCountries);
    }
};
//sort table

$('table.users-table').hide();
$('table.currencies').hide();
$('table.countries').hide();

$('table.users-table tbody').on('click', deleteElement);

$('#submitBtn').on('click', addUser);

$('.load-currencies').click(loadCurrencies);
$('.load-countries').click(loadCountries);

$('.sortable').click(sortTable)
