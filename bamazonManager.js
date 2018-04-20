var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  inquire();
});


function inquire() { 
inquirer.prompt([
  {
    name: "action",
    type: "list",
    message: "\n What would you like to do? \n",
    choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
    ]
  },
])
.then(function(answer) {

    if (answer.action === "View Products for Sale") {
        viewProducts();
    }

    else if (answer.action === "View Low Inventory") {
        lowInventory();
    }

    else if (answer.action === "Add to Inventory") {
        addItems();
    }

    else if (answer.action === "Add New Product") {
        newProduct();
    }
});


}


function viewProducts() {
    console.log("Products available:");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ") " + res[i].product_name + ": $" + res[i].price + ". Stock: " + res[i].stock_quantity);
        }
        exit();
    });
}

function lowInventory() {
    console.log("Running low on:")
    connection.query("SELECT * FROM products WHERE stock_quantity < 10", function(err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ") " + res[i].product_name + ": $" + res[i].price + ". Stock: " + res[i].stock_quantity);
        }
        exit();
    });
    
}

function addItems() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
          console.log(res[i].item_id + ") " + res[i].product_name + ": $" + res[i].price + ". Stock: " + res[i].stock_quantity);
        }
        inquirer.prompt([
            {
              name: "item",
              type: "input",
              message: "Which product would you like to add items to? (enter product number)"
            },
            {
              name: "quantity",
              type: "input",
              message: "How many of this item would you like to add?"
            }
            ])
            .then(function(answer) {
                var quantity;  
                var item;

                for (var h = 0; h < res.length; h++) {
                    if (res[h].item_id === parseInt(answer.item)) {
                        quantity = res[h].stock_quantity;
                        item = res[h].product_name;
                    }
                }
          
                quantity += parseInt(answer.quantity);
              
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                          stock_quantity: quantity
                        },
                        {
                          item_id: answer.item
                        }
                    ],
                    function(error) {
                        if (error) throw err;
                        console.log ("You have added " + answer.quantity + " of " + item + ".");
                        console.log ("new stock is " + quantity);
                        exit();
                    }
                );
                
            });
      });

    
}

function newProduct() {
    inquirer.prompt([
        {
          name: "item",
          type: "input",
          message: "What's the new product name?"
        },
        {
          name: "department",
          type: "input",
          message: "What Department does it belong to?"
        },
        {
            name: "price",
            type: "input",
            message: "What's the unit price?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many items of this product are you adding?"
        }
    ])
    .then(function(answer) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.item,
                department_name: answer.department,
                price: parseInt(answer.price),
                stock_quantity: parseInt(answer.quantity),
            },
            function(err, res) {
                console.log("New Product Added");
                exit();
            }
        );
    });
}

function exit() {
    inquirer.prompt([
        {
          name: "next",
          type: "list",
          message: "\n Task Finished \n",
          choices: ["Next Task", "Exit Program"]
        }
    ])
    .then(function(answer) {
        if(answer.next === "Next Task") {
            inquire();
        }

        else{
            connection.end();
        }    
    });
}