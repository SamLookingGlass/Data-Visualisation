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
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
		
	return time;
}

// Data Gathering from CryptoCompare

/*global axios*/
axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD', {
    params: {
      api_key: "2ccfbedbc83b1a45687c4e6eeaa6ab79299b4ade9398cee3878b6a42c1066f73"
    }
  })
  .then(function(response) {
    let readings = response.data.Data
    let arrayinfocoin = [];
    for (x in readings) {
      //   console.log(readings[x])
      let name = readings[x].CoinInfo.FullName;
      let abbrv = readings[x].CoinInfo.Name;
      let image = readings[x].CoinInfo.ImageUrl;
      let stringprice = readings[x].DISPLAY.USD.PRICE;
      let price = stringprice.replace('$', '').replace(',', '');
      let marketcap = readings[x].DISPLAY.USD.MKTCAP;
      let infocoin = { name, abbrv, price, marketcap, image };
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
      let timeno = readings1[x].time;
      let time = convertTimestamp(timeno)
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
        let timeno = readings2[x].time;
        let time = convertTimestamp(timeno);
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

$(function() {

  $('#btn1').on('click', function() {
    $('#toplist').toggle();

  })

  $('#btn2').on('click', function() {

  })
  
  $('td').on('click', function() {
    alert($(this).attr('id'))
    let graphname = ($(this)[0].innerText);
    let fsym = $(this).attr('id');
    
    $('#selectedcoin').html(`Hourly Price of ${graphname}`)
    
    userinput(fsym)
  })
  
})


