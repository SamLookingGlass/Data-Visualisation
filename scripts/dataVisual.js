// Sanity Check
// alert("Hello! I am an alert box!!");


/*Website JS*/
$(function() {
  // Sidebar toggle behavior
  $('#sidebarCollapse').on('click', function() {
    $('#sidebar, #content').toggleClass('active');
  });
});

// Unix Time Converter 
function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;
			
	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}
	
	// ie: 2013-02-18, 8:35 AM	
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm
		
	return time;
}

// Data Gathering from CryptoCompare

/*global axios*/
function updateCurrency(tsym) {
axios.get("https://min-api.cryptocompare.com/data/top/totalvolfull", {
    params: {
      api_key: "2ccfbedbc83b1a45687c4e6eeaa6ab79299b4ade9398cee3878b6a42c1066f73",
      limit:"20",
      tsym:tsym,
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
    
      if (stringprice.includes('$')) {
       price = stringprice.replace('$', '').replace(',', '')
      } 
      else if (stringprice.includes('£')) {
       price =stringprice.replace('£', '').replace(',', '')
      }
      else {
       price =stringprice.replace('SGD', '').replace(',', '')
      }
      
      let infocoin = { name, abbrv, price, marketcap, image, stringprice, pertchange};
      
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
            
            console.log("before")
            
            for (let c of arrayinfocoin) {
              
            if (c.pertchange > 0) { 
              $(".popcoins").append(`
                            <tr class="table">
                              <td id="${c.abbrv}"> <img src="https://www.cryptocompare.com${c.image}" alt="..." width="30"></img>
                                <h5>${c.name}</h5>
                              </td>
                              <td><strong>Price: <br/>${c.stringprice}</strong></td>
                              <td><strong>24H Chg%: <br/><span class="poschange">${c.pertchange}</span></strong></td>
                              <td><strong>Market Cap: <br/>${c.marketcap}</strong></td>
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
                              <td><strong>24H Chg%: <br/><span class="negchange">${c.pertchange}</span></strong></td>
                              <td><strong>Market Cap: <br/>${c.marketcap}</strong></td>
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

// Bitcoin Data  
/*global axios*/
axios.get('https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=20', {
    params: {
      api_key: "2ccfbedbc83b1a45687c4e6eeaa6ab79299b4ade9398cee3878b6a42c1066f73"
    }
  })
  .then(function(response) {
    let readings1 = response.data.Data
    let arrayinfoBitcoin = [];

    for (x in readings1) {
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

// Toplist function
$(function() {

  $('#btn1').on('click', function() {
    $('#toplist').toggle();

  })

  $('#btn2').on('click', function() {

  })
  
  
  // Currency Conversion
  $('.currency').click(function() {
    alert($(this).attr('id'))
    let tsym = $(this).attr('id');
    updateCurrency(tsym)
    $(".popcoins > tr").remove()
  })
  
  //display graphs onclick
  $('td').on('click', function() {
    alert($(this).attr('id'))
    let graphname = ($(this)[0].innerText);
    let fsym = $(this).attr('id');
    
    $('#selectedcoin').html(`Hourly Price of ${graphname}`)
    
    userinput(fsym)
  })
})
