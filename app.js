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
  runProgram();
});

const runProgram = () => {inquirer
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
            name: 'item',
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
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'item',
            message: 'What auction would you like to place a bid in?'
          },
          { type: 'input', name: 'bid', message: 'How much would you like to bid?' }
        ])
        .then(answers => {
          // UPDATE HERE
        });
    } else {
      // KILL PROGRAM
      console.log('Exiting program!');
      connection.end();
      process.exit();
    }
  });

}

function createItem(itemName, bid) {
  console.log('Inserting a new item...\n');
  var query = connection.query(
    'INSERT INTO items SET ?',
    {
      category: //user input
      itemName: //user input,
      bid: //user input,
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' Item inserted!\n');
      // Call updateProduct AFTER the INSERT completes
      updateItem(itemName, bid);
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateItem(itemName, bid) {
  console.log('Updating bid...\n');
  var query = connection.query(
    'UPDATE products SET ? WHERE ?',
    [
      {
        bid
      },
      {
        itemName
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
