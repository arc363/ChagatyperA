const args = require("args-parser")(process.argv);

if (args.id) {
  console.log(`Request ID supplied`);
} else {
  console.log(`Request ID not supplied. Use "-id=" to prefix ID.`);
}

const validate = require("uuid-validate");

// const arg = process.argv.slice(2);

const valid = validate(args.id);

if (!valid) {
  console.log(`ID invalid`);
  process.exit();
}

const requestID = args.id;
console.log(`Request ID: ${requestID}`);

module.exports = {
  args,
  requestID,
};
// // Create folder with UUID as name
// const fs = require(`fs`);

// if (!fs.existsSync(`./${requestID}`)) {
//   fs.mkdir(`./${requestID}`, (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(`Folder created`);
//   });
// } else {
//   console.log(`Folder already exists`);
// }
