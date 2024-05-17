const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const Port =process.env.PORT || 3006;

const views=path.join(__dirname,"./views");
console.log(views);

app.set('view engine', 'hbs');
app.set('views',views);
// app.use(express.static(path.join(__dirname,'./public')));

app.get('/', (req, res) => {
    const cityname = req.query.city ? req.query.city : "delhi";
    // console.log(cityname);
    let radio = req.query.units;
    // console.log(radio);
    let d = radio ==="metric"? "C" : "F";
    // console.log(d);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=2820e0653be0113c32b58508785433ba&units=${radio}`;
    axios.get(apiUrl)
        .then(response => {
            // Handle the data received from the API
            let objdata = response.data;
            // console.log('Data received:', objdata);
            res.render('index', {
                city: objdata.name,
                temp: objdata.main.temp,
                feels: objdata.main.feels_like,
                country: objdata.sys.country,
                temp_min: objdata.main.temp_min,
                temp_max: objdata.main.temp_min,
                description: objdata.weather[0].description,
                d: d,
            })
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error:', error);
        });
});

app.listen(Port, () => {
    console.log(`port is ${Port}`);
});