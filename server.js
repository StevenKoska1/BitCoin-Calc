const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname+ '/index.html');
});

app.post('/', function(req, res){
    let currency = req.body.currency;
    let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
    //console.log(currency);
    //res.send(`you have selected ${currency}`);

    request(url, function(error, response, body){
        console.log("Status Message: ", response.statusMessage);
        console.log("Server Status Code", response.statusCode);
        console.log(response.body);
    
        let amount;

        let data = JSON.parse(response.body);
        let price;
        let bitcoin = parseFloat(req.body.bitcoin);
        console.log(bitcoin);

        if(currency === "EUR"){
            price = data.bpi.EUR.rate_float;
            console.log("Price in EUR", price)
            amount = price * bitcoin;
            
        } else{
            price = data.bpi.USD.rate_float;
            console.log("Pirce in USD", price);
            amount = price * bitcoin;
        
            
        }

        let disclaimer = data.disclaimer;

        res.write(`${disclaimer}`);
        res.write('<br>');
        res.write(`Current price in ${currency} is ${amount}`);
        
        res.send();
        
        
        
    });
    
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
    
});