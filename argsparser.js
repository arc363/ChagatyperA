const args = require("args-parser")(process.argv);
console.info(args);

if (args.id) {
  console.log(`Request ID present`);
}
