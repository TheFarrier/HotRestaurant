var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [
  {
    id: 54835,
    name: "Yoda",
    email: "yoda@gmail.com",
    phone: "900-548-3248",
  },
  {
    id: 74165,
    name: "Luke Skywalker", 
    email: "skywalker@yahoo.com",
    phone: "900-784-5173",
  },
  {
    id: 45615,
    name: "Obi Wan Kenobi", 
    email: "Ben@yahoo.com",
    phone: "900-784-5173",
  },
  {
    id: 456354,
    name: "Darth Vader", 
    email: "DaddyVader@yahoo.com",
    phone: "900-784-5173",
  },
];

var waitlist = [];

app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var reservation = req.body;

  // Using a RegEx Pattern to remove spaces from reservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  reservation.routeName = reservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(reservation);

  if(tables.length === 5){
    waitlist.push(reservation);
    console.log("Reservations full. You've been added to the waitlist.")
  } else {
    tables.push(reservation);
  }
  
  res.json(reservation);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
