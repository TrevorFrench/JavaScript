const https = require('https');
const csv = require('csv-parser');
const fs = require('fs');
const rp = require('request-promise');
let URL = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=";
let URLEnd = "&apikey=X93LNSLK3L64UQJH";
let output = [];
let tickers = [
{ Ticker: 'ARNA' },
{ Ticker: 'FGP' },
{ Ticker: 'AEM' },
{ Ticker: 'DPS' },
{ Ticker: 'TRMD' },
{ Ticker: 'ENEVY' },
{ Ticker: 'ZM' },
{ Ticker: 'GRSXY' },
{ Ticker: 'GEGYY' },
{ Ticker: 'COE' },
{ Ticker: 'CCOEY' },
{ Ticker: 'FLRAF' },
{ Ticker: 'DRCSY' },
{ Ticker: 'VIRT' },
{ Ticker: 'SAFE' },
{ Ticker: 'FRHC' },
{ Ticker: 'IHICY' },
{ Ticker: 'CUYTY' },
{ Ticker: 'PGENY' },
{ Ticker: 'DHT' },
{ Ticker: 'PYPTF' },
{ Ticker: 'AHCO' },
{ Ticker: 'VIAAY' },
{ Ticker: 'SLP' },
{ Ticker: 'PLMR' },
{ Ticker: 'AWR' },
{ Ticker: 'CTWS' },
{ Ticker: 'TCO' },
{ Ticker: 'CHCJY' },
{ Ticker: 'OLCLY' },
{ Ticker: 'KGDEY' },
{ Ticker: 'HRL' },
{ Ticker: 'DNLMY' },
{ Ticker: 'WDFC' },
{ Ticker: 'PSO' },
{ Ticker: 'DCMYY' },
{ Ticker: 'VGZ' },
{ Ticker: 'SO' },
{ Ticker: 'SO' },
{ Ticker: 'SO' },
{ Ticker: 'SO' },
{ Ticker: 'SO' },
{ Ticker: 'SO' },
{ Ticker: 'SO' },
{ Ticker: 'ASPS' },
{ Ticker: 'GILD' },
{ Ticker: 'GLPG' },
{ Ticker: 'RHHBY' },
{ Ticker: 'HAS' },
{ Ticker: 'ROST' },
{ Ticker: 'WMT' },
{ Ticker: 'AMGN' },
{ Ticker: 'BUD' },
{ Ticker: 'HRB' },
{ Ticker: 'DLTR' }
];

function timer(ms) {
 return new Promise(res => setTimeout(res, ms));
}

	function make_api_call(Ticker){
	    return rp({
	        url : URL + Ticker + URLEnd,
	        method : 'GET',
	        json : true
	    })
	}

	async function processUsers(){
	    let result;
			for(let i = 0; i < tickers.length; i++){
	        result = await make_api_call(tickers[i].Ticker);
          outputTwo = result["Monthly Adjusted Time Series"];
          var keys = Object.keys(outputTwo);
          let csvText = "";
          let n = 0;
          for (x in outputTwo) {
            csvText += "<tr><td>" + tickers[i].Ticker + "</td><td>" + keys[n] + "</td><td>" + outputTwo[x]['5. adjusted close'] + "</td></tr>";
            n++;
          }
          output[i] = csvText;
          var index = i + 1;
          var time = 20 * (tickers.length - i + 1) / 60;

					console.log("Retrieving " + index + "/" + tickers.length);
          console.log("Estimated Time Remaining: " + time + " minutes");
					await timer(20000);
	    }
	    return output;
	}

	async function doTask(){
	    let result = await processUsers();
	    console.log(result);
      let html = "<table>" + result + "</table>";
			fs.writeFile('newfile.html', html, function (err) {
			  if (err) throw err;
			  console.log('Saved!');
			});
	}

doTask();
