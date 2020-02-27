var mysql = require("mysql");
const inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'ice_creamDB'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  createItem();
});

function createItem() {
  console.log('Inserting a new item...\n');
  var query = connection.query(
    'INSERT INTO items SET ?',
    {
      itemName: 'Toothpick',
      bid: 345.00,
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' Item inserted!\n');
      // Call updateProduct AFTER the INSERT completes
      updateItem();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateItem() {
  console.log('Updating bid...\n');
  var query = connection.query(
    'UPDATE products SET ? WHERE ?',
    [
      {
        bid: //User response
      },
      {
        itemnName: //User response
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' products updated!\n');
      // Call deleteProduct AFTER the UPDATE completes
      // deleteItem();
      readItems();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

// function deleteItem() {
//   console.log('Deleting Item...\n');
//   connection.query(
//     'DELETE FROM ? WHERE ?',
//     {
//       flavor: 'strawberry'
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + ' products deleted!\n');
//       // Call readProducts AFTER the DELETE completes
//       readItem();
//     }
//   );
// }

function readItems() {
  console.log('Selecting all items...\n');
  connection.query('SELECT * FROM items', function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
