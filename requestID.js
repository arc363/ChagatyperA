const args = require("args-parser")(process.argv);

if (args.id) {
  console.log(`Request ID supplied`);
} else {
  console.log(`Request ID not supplied. Use "-id=" to prefix ID.`);
}

const validate = require("uuid-validate");

const valid = validate(args.id);

if (!valid) {
  console.log(`ID invalid`);
  process.exit();
}

const requestID = args.id;
console.log(`Request ID: ${requestID}`);

module.exports = {
  args,
  validate,
  valid,
  requestID,
};
