let renderCurrenciesHtml = currencies => {
  let currenciesStr = '';
  for(let currency of currencies) {
    currenciesStr += `<tr>
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

let loadCurrencies = () => {
  let dateValue;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '' + mm + '' + dd;
  if($('#date').val() == "") {
  dateValue = today;
  } else if ($('#date').val() != "") {
  dateValue = $('#date').val().split('-').join('');
  }
  //take today's date

            $.ajax({
            url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=' + dateValue + '&json',
            method: 'GET',
            success: (response) => {
                currencies = response;
                sortTable();
      }
    });
};
//load currencies

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
            renderCurrenciesHtml(currencies);
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
    let sortedCurrencies = currencies.sort((a, b) => {
        return a[dataAttr] > b[dataAttr];
    });
    if(isActive && !isReversed) {
        if(e) {
            $(e.currentTarget).addClass('reversed');
        } else if(dataAttr && isReversed) {
            $(`.sortable[data-attr=${dataAttr}]`).addClass('reversed');
        }
        renderCurrenciesHtml(sortedCurrencies.reverse());
    } else {
        renderCurrenciesHtml(sortedCurrencies);
    }
};
//sort table and localStorage

$('#date').on('change', loadCurrencies);

loadCurrencies();

$('.sortable').click(sortTable);
