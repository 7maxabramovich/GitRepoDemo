let loadCurrencies = () => {

  let dateValue;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = yyyy + '' + mm + '' + dd;
  console.log(today);

  if($('#date').val() == "") {
    dateValue = today;
  } else if ($('#date').val() != "") {
    dateValue = $('#date').val().split('-').join('');
  }

      $.ajax({
      url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=' + dateValue + '&json',
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
                <td>${currency.txt}</td>
                <td>${currency.rate.toFixed(2)}</td>
                <td>${currency.cc}</td>
                <td>${currency.exchangedate}</td>
    					</tr>`;
          }
          $('table.currencies tbody').html(currenciesStr);
          $('table.currencies').show();
      }
  });
};

$('table.currencies').hide();

$('.load-currencies').click(loadCurrencies);
