/*Get Ready Function*/
$(function() {
  // Sidebar toggle behavior
  $('#sidebarCollapse').on('click', function() {
    $('#sidebar, #content').toggleClass('active');
  });

  // Toplist toggle
  $('#toplistCollapse').on('click', function() {
    $('#toplist').toggle();
  });
  
  // Hour Prices toggle
  $('#hrpricesCollapse').on('click', function() {
    $('#hrprices').toggle();
  });

  // Social Media Data toggle
  $('#socialmediaCollapse').on('click', function() {
    $('#socialmedia').toggle();
  });
    
  // Coin Prices Chart toggle
  $('#coinpricesCollapse').on('click', function() {
    $('#coinprices').toggle();
  });
  
  // Currency Selector
  $('.currency').click(function() {
    // alert($(this).attr('id'))
    let tsym = $(this).attr('id');
    updateCurrency(tsym);
    $(".popcoins > tr").remove();
  });

  $('select.choosecurrency').change(function() {
    let tsym = $(this).children("option:selected").val();
    // alert("You have selected the currency - " + tsym);
    updateCurrency(tsym);
    $(".popcoins > tr").remove();
  });

  // Coin selector
  $('select.choosecoin').change(function() {
    let fsym = $(this).children("option:selected").val();
    // alert("You have selected the coin - " + fsym);
    updateCoin(fsym);
    $('#coinselected').html(`Hourly Price of ${fsym}`);
  });

  // IMG selector
  $("tbody").on("click", "tr", function() {
    let fsym = $(this).attr('value');
    let coinId = $(this).attr('id');
    alert("You have selected " + fsym + coinId);
    updateCoin(fsym);
    updateId(coinId);
    $('#coinselected').html(`Hourly Price of ${fsym}`);
  });
}); //End of Get Ready Function


// Default Settings (Currency and Coin)
if ("1" === "1") {
  let tsym = "GBP";
  let fsym = "BTC";
  updateCurrency(tsym);
  updateCoin(fsym);
}

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
      let readings = response.data.Data;
      let arrayinfocoin = [];
      for (x in readings) {
        console.log(readings[x]);
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
        let coinid = readings[x].CoinInfo.Id;


        if (stringprice.includes('$')) {
          price = stringprice.replace('$', '').replace(',', '');
        }
        else if (stringprice.includes('£')) {
          price = stringprice.replace('£', '').replace(',', '');
        }
        else {
          price = stringprice.replace('SGD', '').replace(',', '');
        }

        let infocoin = { name, abbrv, price, marketcap, image, stringprice, pertchange, supply, marketinfo, high24, low24, coinid };

        arrayinfocoin.push(infocoin);

      }
      // console.log(arrayinfocoin);
      //   console.log(readings);
      printdata(arrayinfocoin);
    })
    .catch(function(error) {
      console.log(error);
    })
    .then(function() {
      // always executed

    });
} //End of Function

function printdata(arrayinfocoin) {
  var ndx = crossfilter(arrayinfocoin);
  var name_dim = ndx.dimension(dc.pluck('name'));
  var price = name_dim.group().reduceSum(dc.pluck('price'));

  for (let c of arrayinfocoin) {

    if (c.pertchange > 0) {
      $(".popcoins").append(`
                            <tr value="${c.abbrv}" id="${c.coinid}">
                              <td> <img src="https://www.cryptocompare.com${c.image}" alt="..." width="30"></img>
                                <h5>${c.name}</h5>
                              </td>
                              <td><strong>${c.stringprice}</strong></td>
                              <td><strong>${c.high24}</strong></td>
                              <td><strong>${c.low24}</strong></td>
                              <td><strong><span class="poschange">${c.pertchange}</span></strong></td>
                              <td><strong>${c.marketcap}</strong></td>
                              <td><strong>${c.marketinfo}</strong></td>
                            </tr>
                      `);
    }

    else if (c.pertchange < 0) {
      $(".popcoins").append(`
                            <tr value="${c.abbrv}" id="${c.coinid}">
                              <td> <img src="https://www.cryptocompare.com${c.image}" alt="..." width="30"></img>
                                <h5>${c.name}</h5>
                              </td>
                              <td><strong>${c.stringprice}</strong></td>
                              <td><strong>${c.high24}</strong></td>
                              <td><strong>${c.low24}</strong></td>
                              <td><strong><span class="negchange">${c.pertchange}</span></strong></td>
                              <td><strong>${c.marketcap}</strong></td>
                              <td><strong>${c.marketinfo}</strong></td>
                            </tr>
                      `);
    }

    else {
      $(".popcoins").append(`
                            <tr value="${c.abbrv}" id="${c.coinid}">
                              <td> <img src="https://www.cryptocompare.com${c.image}" alt="..." width="30"></img>
                                <h5>${c.name}</h5>
                              </td>
                              <td><strong>${c.stringprice}</strong></td>
                              <td><strong>${c.high24}</strong></td>
                              <td><strong>${c.low24}</strong></td>
                              <td><strong><span class="nochange">${c.pertchange}</span></strong></td>
                              <td><strong>${c.marketcap}</strong></td>
                              <td><strong>${c.marketinfo}</strong></td>
                            </tr>
                      `);
    }

  }


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


  var name_dim = ndx.dimension(dc.pluck('name'));
  var price = name_dim.group().reduceSum(dc.pluck('price'));


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
} //End of Function

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
      let readings1 = response.data.Data;
      let arrayinfoBitcoin = [];

      for (x in readings1) {
        //   console.log(readings1[x])
        let time_raw = readings1[x].time;
        let time = convertTimestamp(time_raw);
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
} //End of Function

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


// Get Ready Function
$(function() {



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

      
  //single graph
  dc.lineChart("#hourlyprice")
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
//End of Function

//Social Media Data

function updateId(coinId) {
  axios.get('https://min-api.cryptocompare.com/data/social/coin/latest', {
      params: {
        api_key: "2ccfbedbc83b1a45687c4e6eeaa6ab79299b4ade9398cee3878b6a42c1066f73",
        coinId: coinId,
      }
    })
    .then(function(response) {
      let arraysocialData = [];
      let socialData = response.data.Data;
      let redditstats = socialData.Reddit;
      let twitterstats = socialData.Twitter;
      let codeRepositorystats = socialData.CodeRepository.List;
      let facebookstats = socialData.Facebook;
      
      console.log(socialData)
      
      let reddit_active_users = redditstats.active_users
      let reddit_coin_name = redditstats.name;
      let reddit_subscribers = redditstats.subscribers;
      let reddit_link = redditstats.link;
      let reddit_comments_day = redditstats.comments_per_day;
      let reddit_comments_hour = redditstats.comments_per_hour;
      
      let reddit =  [{ reddit_active_users, reddit_coin_name, reddit_subscribers, reddit_link, reddit_comments_day, reddit_comments_hour }];
      
      
      let facebook_likes = facebookstats.likes; 
      let facebook_link = facebookstats.link;
      
      let facebook = [{facebook_link, facebook_likes}]
      
      let twitter_follwers = twitterstats.followers;
      let twitter_link = twitterstats.link;
      
      let twitter = [{twitter_follwers, twitter_link}]
      
      let projectinfo = []
      for (x in codeRepositorystats) {
        let project_forks = codeRepositorystats[x].forks;
        let project_last_update = codeRepositorystats[x].last_update;
        let project_last_push = codeRepositorystats[x].last_push;
        let project_subscribers = codeRepositorystats[x].subscribers;
        let project_link = codeRepositorystats[x].url;
        let project_stats = {project_forks, project_last_update, project_last_push, project_subscribers, project_link}
        projectinfo.push(project_stats)
      }
      
      let mediainfo = []
      media_stats = {reddit_subscribers, reddit_link,  facebook_likes, facebook_link, twitter_follwers, twitter_link}
      mediainfo.push(media_stats);
      console.log(reddit, facebook, twitter, projectinfo)
      console.log(media_stats)
      socialgraph(media_stats)
      
      
        function socialgraph(media_stats) {

            
            dc.renderAll();
        }
    
    })
    .catch(function(error) {
      console.log(error);
    })
    .then(function() {
      // always executed
    });

}

// var dataset = {
//   medima_fields: [
//       {key: 'dxid', value: 6}, 
//       {key: 'hic', value: 2}, 
//       {key: 'etc', value: 4},
//       ],
// };
    
// var width = 460,
//     height = 300,
//     radius = Math.min(width, height) / 2;

// var donut = d3.select("#donutgraph")
//     .attr("class", "medima-donut-chart")
//     .attr("style", "width:" + width + "px;");
    
// var pie = d3.layout.pie()
//     .value(function (d) {return d.value;})
//     .sort(null);

// var arc = d3.svg.arc()
//     .innerRadius(radius - 75)
//     .outerRadius(radius - 50);

// var svg = donut.append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// var path = svg.selectAll("path")
//     .data(pie(dataset.medima_fields))
//     .enter().append("path")
//     .attr("d", arc)
//     .data(dataset.medima_fields)
//     .attr("class", function(d) { return d.key; });
    
// var total = 0
//     for (var i = 0; i < dataset.medima_fields.length; i++ ){
//     total+=dataset.medima_fields[i].value
// }
   
// var donutTotal = donut.append("div")    
//     .attr("class", "medima-donut-total")
//     .html(total + "<div class='medima-donut-total-subtext'>OVERLAPS</div>");