const fs = require(`fs`);

const { requestID, valid } = require(`./requestID`);
const validate = require("uuid-validate");

// const checkJSON = validate;

if (!fs.existsSync(`./${requestID}.json`)) {
  fs.readdir(`./${requestID}.json`, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Failed to locate JSON file`);
  });
} else {
  console.log(`JSON file located`);
}
