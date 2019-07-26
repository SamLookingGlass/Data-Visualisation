/*Website JS*/
$(function() {
  // Sidebar toggle behavior
  $('#sidebarCollapse').on('click', function() {
    $('#sidebar, #content').toggleClass('active');
  });

  // Toplist toggle
  $('#btn1').on('click', function() {
    $('#toplist').toggle();

  })

  //display graphs onclick
  // $('img#BTC').on('click', function() {
  //   alert($(this).val())
  //   let graphname = ($(this)[0].innerText);
  //   let fsym = $(this).val();

  //   $('#selectedcoin').html(`Hourly Price of ${graphname}`)

  //   userinput(fsym)
  // })

});



// let currency_array = [{value="GBP"},{value="USD"},{value="SGD"},{value="EUR"},
// {value="DZD"}, {value="ARS"}, {value="AUD"}, {value="BRL"}, {value="BGN"},
// {value="CAD"}, {value="CLP"}, {value="CNY"}, {value="COP"}, {value="DKK"},
// {value="NLG"}, {value="EGP"}, {value="XAU"}, {value="HKD"}, {value="HUF"},
// {value="ISK"}, {value="INR"}, {value="IDR"}, {value="ILS"}, {value="JMD"},
// {value="JPY"}, {value="JOD"}, {value="KRW"}, {value="LBP"}, {value="MYR"},
// {value="NLG"}, {value="NZD"}, {value="NGN"}, {value="NOK"}, {value="PKR"},
// {value="PHP"}, {value="PLN"}, {value="RUR"}, {value="SAR"}, {value="ZAR"},
// {value="SEK"}, {value="CHF"}, {value="TWD"}, {value="THB"}, {value="TTD"},
// {value="XAG"}, {value="XAU"}]

// function currency_conversion(currency_array, callback) {

// }
// Data Gathering from CryptoCompare
// readme needs to be detailed for writeup including testing and deployment, deployment plan 

/*global axios*/
/*TopList*/
function updateCurrency(tsym) {
  axios.get("https://min-api.cryptocompare.com/data/top/totalvolfull", {
      params: {
        api_key: "2ccfbedbc83b1a45687c4e6eeaa6ab79299b4ade9398cee3878b6a42c1066f73",
        limit: "10",
        tsym: tsym,
        page: 0,
      }
    })
    .then(function(response) {
      console.log(tsym);
      let readings = response.data.Data
      let arrayinfocoin = [];
      for (x in readings) {
        console.log(readings[x])
        let name = readings[x].CoinInfo.FullName;
        let abbrv = readings[x].CoinInfo.Name;
        let image = readings[x].CoinInfo.ImageUrl;
        let stringprice = readings[x].DISPLAY[tsym].PRICE;
        let pertchange = readings[x].DISPLAY[tsym].CHANGEPCT24HOUR;
        let marketcap = readings[x].DISPLAY[tsym].MKTCAP;
        let supply = readings[x].DISPLAY[tsym].SUPPLY;
        let marketinfo = readings[x].DISPLAY[tsym].LASTMARKET;
        let high24 = readings[x].DISPLAY[tsym].HIGH24HOUR;
        let low24 = readings[x].DISPLAY[tsym].LOW24HOUR;


        if (stringprice.includes('$')) {
          price = stringprice.replace('$', '').replace(',', '')
        }
        else if (stringprice.includes('£')) {
          price = stringprice.replace('£', '').replace(',', '')
        }
        else {
          price = stringprice.replace('SGD', '').replace(',', '')
        }

        let infocoin = { name, abbrv, price, marketcap, image, stringprice, pertchange, supply, marketinfo, high24, low24 };


        arrayinfocoin.push(infocoin);
      }
      console.log(arrayinfocoin);
      //   console.log(readings);
      printdata(arrayinfocoin);
    })
    .catch(function(error) {
      console.log(error);
    })
    .then(function() {
      // always executed

    });
}

function printdata(arrayinfocoin) {
  var ndx = crossfilter(arrayinfocoin);
  var name_dim = ndx.dimension(dc.pluck('name'));
  var price = name_dim.group().reduceSum(dc.pluck('price'));

  for (let c of arrayinfocoin) {

    if (c.pertchange > 0) {
      $(".popcoins").append(`
                            <tr class="table">
                              <td id="${c.abbrv}"> <img src="https://www.cryptocompare.com${c.image}" alt="..." width="30"></img>
                                <h5>${c.name}</h5>
                              </td>
                              <td><strong>Price: <br/>${c.stringprice}</strong></td>
                              <td><strong>24H High: <br/>${c.high24}</strong></td>
                              <td><strong>24H Low: <br/>${c.low24}</strong></td>
                              <td><strong>24H Chg%: <br/><span class="poschange">${c.pertchange}</span></strong></td>
                              <td><strong>Market Cap: <br/>${c.marketcap}</strong></td>
                              <td><strong>Info from: <br/>${c.marketinfo}</strong></td>
                            </tr>
                      `)
    }

    else if (c.pertchange < 0) {
      $(".popcoins").append(`
                            <tr class="table">
                              <td id="${c.abbrv}"> <img src="https://www.cryptocompare.com${c.image}" alt="..." width="30"></img>
                                <h5>${c.name}</h5>
                              </td>
                              <td><strong>Price: <br/>${c.stringprice}</strong></td>
                              <td><strong>24H High: <br/>${c.high24}</strong></td>
                              <td><strong>24H Low: <br/>${c.low24}</strong></td>
                              <td><strong>24H Chg%: <br/><span class="negchange">${c.pertchange}</span></strong></td>
                              <td><strong>Market Cap: <br/>${c.marketcap}</strong></td>
                              <td><strong>Info from: <br/>${c.marketinfo}</strong></td>
                            </tr>
                      `)
    }

    else {
      $(".popcoins").append(`
                            <tr class="table">
                              <td id="${c.abbrv}"> <img src="https://www.cryptocompare.com${c.image}" alt="..." width="30"></img>
                                <h5>${c.name}</h5>
                              </td>
                              <td><strong>Price: <br/>${c.stringprice}</strong></td>
                              <td><strong>24H High: <br/>${c.high24}</strong></td>
                              <td><strong>24H Low: <br/>${c.low24}</strong></td>
                              <td><strong>24H Chg%: <br/><span class="nochange">${c.pertchange}</span></strong></td>
                              <td><strong>Market Cap: <br/>${c.marketcap}</strong></td>
                              <td><strong>Info from: <br/>${c.marketinfo}</strong></td>
                            </tr>
                      `)
    }

  };


  dc.barChart('#dataset')
    .width(1000)
    .height(500)
    .margins({ top: 10, right: 50, bottom: 30, left: 50 })
    .dimension(name_dim)
    .group(price)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Price of Coins")
    .yAxis().ticks(5);

  dc.renderAll();

  // line graph
  // function makeGraphs(error, arrayinfocoin) {
  // var ndx = crossfilter(arrayinfocoin);

  // var parseDate = d3.time.format("%d/%m/%Y").parse;
  // arrayinfocoin.forEach(function(d){
  //     d.date = parseDate(d.date);
  // });

  var name_dim = ndx.dimension(dc.pluck('name'));
  var price = name_dim.group().reduceSum(dc.pluck('price'));

  // var minDate = name_dim.bottom(1)[0].date;
  // var maxDate = name_dim.top(1)[0].date;

  dc.lineChart("#dataset1")
    .width(1000)
    .height(300)
    .margins({ top: 10, right: 50, bottom: 30, left: 50 })
    .dimension(name_dim)
    .group(price)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Price of Coins")
    .yAxis().ticks(5);


  dc.renderAll();
}

// Bitcoin/Ethereum/Litecoin Data  
/*global axios*/
function updateCoin(fsym) {
axios.get('https://min-api.cryptocompare.com/data/histohour', {
    params: {
      api_key: "2ccfbedbc83b1a45687c4e6eeaa6ab79299b4ade9398cee3878b6a42c1066f73",
      fsym: fsym,
      tsym: "SGD",
      limit: 20,
    }
  })
  .then(function(response) {
    let readings1 = response.data.Data
    let arrayinfoBitcoin = [];

    for (x in readings1) {
      //   console.log(readings1[x])
      let time_raw = readings1[x].time;
      let time = convertTimestamp(time_raw)
      let close = readings1[x].close;
      let high = readings1[x].high;
      let low = readings1[x].low;
      let open = readings1[x].open;
      let volumefrom = readings1[x].volumefrom;
      let volumeto = readings1[x].volumeto;
      let infoBitcoin = { time, close, high, low, open, volumefrom, volumeto };
      arrayinfoBitcoin.push(infoBitcoin);
    }
    // console.log(arrayinfoBitcoin);
    printdata1(arrayinfoBitcoin);
  })
  .catch(function(error) {
    console.log(error);
  })
  .then(function() {
    // always executed
  });
}

// Unix Time Converter 
function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
    dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
    hh = d.getHours(),
    h = hh,
    min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
    ampm = 'AM',

    // ie: 2013-02-18, 8:35 AM	
    // time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm
    time = h + ':' + min
  return time;
}


//Any Coin (Testing)
function getData() {
  let fsym = ($('#coin').val())
  userinput(fsym)
}

var apistring = "https://min-api.cryptocompare.com/data/histohour";

function userinput(fsym) {
  axios.get(apistring, {
      params: {
        api_key: "2ccfbedbc83b1a45687c4e6eeaa6ab79299b4ade9398cee3878b6a42c1066f73",
        fsym: fsym,
        tsym: "USD",
        limit: "20",
      }
    })
    .then(function(response) {
      console.log(response)
      let readings2 = response.data.Data
      let arrayinfoETH = [];

      for (x in readings2) {
        //   console.log(readings2[x])
        let time = readings2[x].time;
        let close = readings2[x].close;
        let high = readings2[x].high;
        let low = readings2[x].low;
        let open = readings2[x].open;
        let volumefrom = readings2[x].volumefrom;
        let volumeto = readings2[x].volumeto;
        let infoETH = { time, close, high, low, open, volumefrom, volumeto };
        arrayinfoETH.push(infoETH);
      }
      // console.log(arrayinfoETH);
      printdata2(arrayinfoETH);
    })
    .catch(function(error) {
      console.log(error);
    })
    .then(function() {
      // always executed

    });
}

// Get Ready Function
$(function() {


  // Currency Conversion
  $('.currency').click(function() {
    // alert($(this).attr('id'))
    let tsym = $(this).attr('id');
    updateCurrency(tsym)
    $(".popcoins > tr").remove()
  })

  $('select.choosecurrency').change(function() {
    let tsym = $(this).children("option:selected").val();
    // alert("You have selected the currency - " + tsym);
    updateCurrency(tsym)
    $(".popcoins > tr").remove()
  })

  $('select.choosecoin').change(function() {
    let fsym = $(this).children("option:selected").val();
    alert("You have selected the coin - " + fsym);
    updateCoin(fsym)
    $('#coinselected').html(`Hourly Price of ${fsym}`)
  })


  // Pagination

  //   $('.pagination').pagination({
  //     dataSource: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?',
  //     locator: 'items',
  //     totalNumberLocator: function(response) {
  //         // you can return totalNumber by analyzing response content
  //         return Math.floor(Math.random() * (1000 - 100)) + 100;
  //     },
  //     pageSize: 20,
  //     ajax: {
  //         beforeSend: function() {
  //             dataContainer.html('Loading data from flickr.com ...');
  //         }
  //     },
  //     callback: function(data, pagination) {
  //         // template method of yourself
  //         var html = template(data);
  //         dataContainer.html(html);
  //     }
  // })


})

// second api
function printdata1(arrayinfoBitcoin) {
  var ndx = crossfilter(arrayinfoBitcoin);
  var time_dim = ndx.dimension(dc.pluck('time'));
  var open = time_dim.group().reduceSum(dc.pluck('open'));


  dc.lineChart("#dataset2")
    .width(1000)
    .height(300)
    .margins({ top: 10, right: 50, bottom: 30, left: 50 })
    .dimension(time_dim)
    .group(open)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Hourly Prices")
    .yAxis().ticks(5);


  dc.renderAll();
}
//end of API call

// ETH api
function printdata2(arrayinfoETH) {
  var ndx = crossfilter(arrayinfoETH);
  var time_dim = ndx.dimension(dc.pluck('time'));
  var open = time_dim.group().reduceSum(dc.pluck('open'));


  dc.lineChart("#dataset3")
    .width(1000)
    .height(300)
    .margins({ top: 10, right: 50, bottom: 30, left: 50 })
    .dimension(time_dim)
    .group(open)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Hourly Prices")
    .yAxis().ticks(5);


  dc.renderAll();
}
//end of API call



// Test for Composite Graphs
axios.get('https://min-api.cryptocompare.com/data/histominute', {
    params: {
      api_key: "2ccfbedbc83b1a45687c4e6eeaa6ab79299b4ade9398cee3878b6a42c1066f73",
      limit: "10",
      tsym: 'EOS',
    }

  })
  .then(function(response) {
    let compositereadings = response.data.Data
    let arrayEOSinfo = [];

    for (x in arrayEOSinfo) {
      //   console.log(readings1[x])
      let time = readings1[x].time;
      let close = readings1[x].close;
      let high = readings1[x].high;
      let low = readings1[x].low;
      let open = readings1[x].open;
      let volumefrom = readings1[x].volumefrom;
      let volumeto = readings1[x].volumeto;
      let infoBitcoin = { time, close, high, low, open, volumefrom, volumeto };
      arrayinfoBitcoin.push(infoBitcoin);
    }
    // console.log(arrayinfoBitcoin);
    printdata1(arrayinfoBitcoin);
  })
  .catch(function(error) {
    console.log(error);
  })
  .then(function() {
    // always executed

  });

function drawCompositeGraphs(error, transactionsData) {
  var ndx = crossfilter(transactionsData);
  var parseDate = d3.time.format("%d/%m/%Y").parse;

  transactionsData.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var date_dim = ndx.dimension(dc.pluck('date'));

  var minDate = date_dim.bottom(1)[0].date;
  var maxDate = date_dim.top(1)[0].date;

  function spend_by_name(name) {
    return function(d) {
      if (d.name === name) {
        return +d.spend;
      }
      else {
        return 0;
      }
    }
  }

  var tomSpendByMonth = date_dim.group().reduceSum(spend_by_name('Tom'));

  var bobSpendByMonth = date_dim.group().reduceSum(spend_by_name('Bob'));

  var aliceSpendByMonth = date_dim.group().reduceSum(spend_by_name('Alice'));

  var compositeChart = dc.compositeChart('#composite-chart');

  compositeChart
    .width(990)
    .height(200)
    .dimension(date_dim)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .yAxisLabel("Spend")
    .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)
    .compose([
      dc.lineChart(compositeChart)
      .colors('green')
      .group(tomSpendByMonth, 'Tom'),
      dc.lineChart(compositeChart)
      .colors('red')
      .group(bobSpendByMonth, 'Bob'),
      dc.lineChart(compositeChart)
      .colors('blue')
      .group(aliceSpendByMonth, 'Alice')
    ])
    .brushOn(false)
    .render();
  dc.renderAll();
}
