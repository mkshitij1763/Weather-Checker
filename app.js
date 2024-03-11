const express = require("express");
const https = require("https");
// https tevha use karat satta jevha aplya server la kontya dusrya server warun data request karaycha ahe ani to jo data yete tyala
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
// above is must to run body parser

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/about", function (req, res) {
  //install body-parser to take the form input as a variable to work upon(based on the name attribute of our input)
//   console.log(req.body.citynamehtml);

  const appid = "0f9bfd3a5e2628edbd5f4fc0dd813888";
  const cityname = req.body.citynamehtml;
  const link =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=metric&appid=" +
    appid +
    "";
  https.get(link, function (response) {
    // console.log(response.name);
    response.on("data", function (data) {
      console.log(data);
      const weatherdata = JSON.parse(data);
      //JSON.parse = Converts a JavaScript Object Notation (JSON) string into an object so that it is easily accesible.
      console.log(weatherdata);
      //    const object = {
      //     name : "Kshitij ",
      //     College : "IIT Roorkee",
      //    }
      //    console.log(JSON.stringify(object));
      // use chrome extension json viewer pro to see a tree format of the complete json file.
      const temp = weatherdata.main.temp;
      const wdescription = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;

      const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        " <h1>The temperature here in " + cityname + " is: " + temp + "</h1>  "
      );
      res.write(" <h1>The Weather Description is: " + wdescription + "</h1> ");
      res.write(" <img src=" + imgurl + "> ");
      res.send();

      //     // console.log(temp);
      //     // console.log(wdescription);
    });
  });

  // res.send("hiiiii");
});

app.listen(3000, function (req, res) {
  console.log("Server started at port 3000");
});
