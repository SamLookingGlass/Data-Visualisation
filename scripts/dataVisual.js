// Sanity Check
// alert("Hello! I am an alert box!!");

// Data Gathering from CryptoCompare
let crypto = null
/*global axios*/
axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD', {
    params: {
    api_key:"2ccfbedbc83b1a45687c4e6eeaa6ab79299b4ade9398cee3878b6a42c1066f73"
    }
  })
  .then(function (response) {
      let readings = response.data.Data
      let arrayinfocoin = [];
      for(x in readings) {
      // console.log(readings[x])
       let name = readings[x].CoinInfo.FullName;
       let abbrv = readings[x].CoinInfo.Name;
       let image = readings[x].CoinInfo.ImageUrl;
       let price = readings[x].DISPLAY.USD.PRICE;
       let marketcap = readings[x].DISPLAY.USD.MKTCAP;
       let infocoin = {name, abbrv, price, marketcap, image};
       arrayinfocoin.push(infocoin);
      }
      console.log(arrayinfocoin);
      console.log(readings);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
    
  });  
  

  
  