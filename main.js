const args = require("args-parser")(process.argv);
const path = require("path");
const fs = require(`fs`);

// Get id from run time parameters
if (args.id) {
  console.log(`Request ID supplied`);
} else {
  console.log(`Request ID not supplied. Use "-id=" to prefix ID.`);
}

// Validate parameter
const requestID = validateID(args.id);
function validateID(id) {
  const validate = require("uuid-validate");

  const valid = validate(id);

  if (!valid) {
    console.log(`ID invalid`);
    process.exit();
  }
  console.log(`Request ID: ${id}`);
  return id;
}

// Check uploads folder exists & if not create one
uploadFolder(requestID);
function uploadFolder(id) {
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
}

// Look for json file named the same as the id in the folder - use fs.read
checkJson(requestID);
function checkJson(id) {
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
}
/*
// Read the json into a variable
readInData(requestID);
function readInData(id) {
  return fs.readFile(
    path.resolve(__dirname, `${id}.json`),
    "utf8",
    function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      // console.log(obj);
      return obj;
    }
  );
}

// // database portion
const pool = require("pg"); // pg is the postgres database client package

// This configures our connection pool
export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "phylogenetic-data",
  password: "postgres",
  port: 5432,
});

// A basic error message if the connection pool dies
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
// A function to take the id and data and insert it into the correct row of the database
export async function uploadSubmission(id, jsonData) {
  const client = await pool.connect();
  try {
    await client.query(
      "UPDATE public.submissions SET status_id=5, processed_data=$2 WHERE id=$1;",
      [id, jsonData]
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    client.release();
  }
}
*/
// open database connection
// Run command to insert the data and set the status
// Close connection
