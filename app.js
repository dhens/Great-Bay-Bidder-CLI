var mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'password',
  database: 'greatBayDB'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected as id ' + connection.threadId + '\n');
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'Would you like to [POST] an auction or [BID] on an auction?',
      choices: ['POST', 'BID', 'EXIT']
    })
    .then(answers => {
      if (answers.action === 'POST') {
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'itemName',
              message: 'What is the item you would like to submit?'
            },
            {
              type: 'input',
              name: 'category',
              message: 'What category would you like to place your auction in?'
            },
            {
              type: 'input',
              name: 'bid',
              message: 'What would you like your starting bid to be?'
            }
          ])
          .then(answers => {
            // CREATE HERE
          });
      } else if (answers.action === 'BID') {
      } else {
      }
    });
});

function createProduct() {
  console.log('Inserting a new product...\n');
  var query = connection.query(
    'INSERT INTO products SET ?',
    {
      flavor: 'Rocky Road',
      price: 3.0,
      quantity: 50
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' product inserted!\n');
      // Call updateProduct AFTER the INSERT completes
      updateProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateProduct() {
  console.log('Updating all Rocky Road quantities...\n');
  var query = connection.query(
    'UPDATE products SET ? WHERE ?',
    [
      {
        quantity: 100
      },
      {
        flavor: 'Rocky Road'
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' products updated!\n');
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct() {
  console.log('Deleting all strawberry icecream...\n');
  connection.query(
    'DELETE FROM products WHERE ?',
    {
      flavor: 'strawberry'
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' products deleted!\n');
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
}

function readProducts() {
  console.log('Selecting all products...\n');
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
