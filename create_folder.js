const fs = require(`fs`);
const { args, requestID, valid, validate } = require(`./requestID`);
const {} = require(`./check_json.js`);

if (!fs.existsSync(`./${requestID}`)) {
  fs.mkdir(`./${requestID}`, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Folder created`);
  });
} else {
  console.log(`Folder already exists`);
}
