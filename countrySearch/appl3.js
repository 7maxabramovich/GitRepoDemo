let renderCountries = countries => {
  let countriesStr = ``;
  for(let countryIndex in countries) {
    let country = countries[countryIndex];
    countriesStr += `<tr class="country-${countryIndex}">
        <td>${+countryIndex+1}</td>
        <td>${country.name}</td>
        <td>${country.population}</td>
        <td>${country.area}</td>
        <td>${country.capital}</td>
        <td><img height='50' src='${country.flag}'</td>
      </tr>`;
  }
  $('table.countries tbody').html(countriesStr);
};
//render countries


let loadCountries = e => {
    $.ajax({
      method: 'GET',
      url: 'https://restcountries.eu/rest/v2/all',
      success: (response) => {
        countries = response;
        renderCountries(response);
        // sortTable();
      }
  });
};


// let getCountries = dateValue => {
//     if(dataObj[dateValue]) {
//         renderCountries(dataObj[dateValue]);
//         return;
//     }
//     $.ajax({
//         url: `https://restcountries.eu/rest/v2/all`,
//         method: 'GET',
//         error: (e) => {
//             console.log(e);
//         },
//         success: (data) => {
//             dataObj.data = data;
//             dataObj[dateValue] = data;
//             console.log(dataObj);
//             renderCountries(data);
//         }
//     });
// };


//get countries

// let saveDate = dateStr => {
//         localStorage.setItem('dateStr', dateStr);
// };
// //save date
//
// let getSavedDate = () => {
//           return localStorage.getItem('dateStr') || false;
// };
// //get saved date
//
// $(document).ready(() => {
//     let savedDate = getSavedDate();
//     let thisDate;
//     if(savedDate) {
//         thisDate = savedDate;
// //document ready
//
//       let dateToPaste = savedDate.substring(0,4) + '-' + savedDate.substring(4, 6) + '-' + savedDate.substring(6, 8);
//         $('#date').val(dateToPaste);
//     } else {
//         let dateNow = new Date();
//         let dateArr = [dateNow.getFullYear() + '', (+dateNow.getMonth() + 1) + '', (dateNow.getDate()) + ''];
// //date to paste, date now, date arr
//
//         if((dateArr[1]+'').length < 2) {
//             dateArr[1] = '0' + dateArr[1];
//         }
//         if((dateArr[2]+'').length < 2) {
//             dateArr[2] = '0' + dateArr[2];
//         }
//         thisDate = dateArr.join('');
//   }
// //this date
//
//   getCountries(thisDate);
//
//   $('#date').change(e => {
//         let dateStr = $(e.currentTarget).val();
//         if(dateStr) {
//             dateStr = dateStr.split('-').join('');
//             getCountries(dateStr);
//             saveDate(dateStr);
//         }
//     });
// //get countries

$(document).ready(() => {
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
            let dataToRender = countries.filter(el => {
                return el.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
                el.capital.toLowerCase().indexOf(value.toLowerCase()) > -1;
            });
            renderCountries(dataToRender);
        } else {
            renderCountries(countries);
        }
    })
});

//search

loadCountries();
