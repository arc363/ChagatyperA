const path = require("path");
const fs = require(`fs`);

const { requestID } = require(`./requestID`);

var obj;
// fs.readFile(`./${requestID}.json`, "utf8", function (err, data) {
fs.readFile(path.resolve(__dirname, "zika.json"), "utf8", function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  console.log(obj);
});
