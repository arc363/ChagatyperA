import argsParser from "args-parser";
const args = argsParser(process.argv);
import path from "path";
import fs from "fs";
import pg from "pg"; // pg is the postgres database client package
import validate from "uuid-validate";

import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// This configures our connection pool
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "chagatyper",
  password: "postgres",
  port: 5432,
});

// A basic error message if the connection pool dies
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
// Get id from run time parameters
if (args.id) {
  console.log(`Request ID supplied`);
} else {
  console.log(`Request ID not supplied. Use "-id=" to prefix ID.`);
}

// Validate parameter
const requestID = validateID(args.id);
function validateID(id) {
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
        // console.log(err);
      }
      console.log(`Folder created`);
    });
  } else {
    console.log(`Folder already exists`);
  }
}

// Look for json file named the same as the id in the folder - use fs.read

// Read the json into a variable IF the corresponding JSON file was located
if (fs.existsSync(`./${requestID}.json`)) {
  let obj = readInData(requestID);
  function readInData(id) {
    return fs.readFile(
      path.resolve(__dirname, `${id}.json`),
      "utf8",
      function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        uploadSubmission(requestID, obj);
      }
    );
  }
  console.log(`JSON data read into variable`);
}

// A function to take the id and data and insert them into the correct row of the database
async function uploadSubmission(id, jsonData) {
  const client = await pool.connect();
  try {
    await client.query(
      "UPDATE public.submissions SET status_id=5, clinical_classification='chocolate cake', processed_data=$2 WHERE id=$1;",
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

// open database connection
// Run command to insert the data and set the status
// Close connection
