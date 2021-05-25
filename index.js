const fetch = require("node-fetch");
const api = require("./api");

// fetch("https://rails.discovery.indazn.com/ca/v8/rails?country=ca&groupId=home")
//   .then((res) => res.text())
//   .then((body) => console.log(body));

const requestBuilder = (country) => {
  console.log(country);
};

var args = process.argv.slice(2);
console.log(args);
