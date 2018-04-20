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
  readProducts();
});

function readProducts() {
    console.log("Products available:");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (i = 0; i < res.length; i++) {
        console.log(res[i].item_id + ") " + res[i].product_name + ": $" + res[i].price);
      }
      inquire(res);
    });
}

function inquire(res) { 
inquirer.prompt([
  {
    name: "item",
    type: "input",
    message: "Which item would you like to purchase? (enter product number)"
  },
  {
    name: "quantity",
    type: "input",
    message: "How many of this item would you like to purchase?"
  }
])
.then(function(answer) {
    var quantity;
    var item;
    var price;
    var itemC = parseInt(answer.item);
    var quantityC = parseInt(answer.quantity);
    
    for (var h = 0; h < res.length; h++) {
        if (res[h].item_id === parseInt(answer.item)) {
            quantity = res[h].stock_quantity;
            item = res[h].product_name;
            price = res[h].price;
        }
    }

    if (quantity > quantityC) {
        
        var total = quantityC*price;

        quantity -= quantityC;
    
        console.log ("You have bought " + quantityC + " of " + item + ". Your total was $" + total);

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
                exit();
            }
          );
    }

    else {
        console.log ("We don't have enough of that item. Please try again.");
        exit();
    }

});

}

function exit() {
    inquirer.prompt([
        {
          name: "next",
          type: "list",
          message: "\n Continue Shopping? \n",
          choices: ["Yes", "No"]
        }
    ])
    .then(function(answer) {
        if(answer.next === "Yes") {
            readProducts();
        }

        else{
            connection.end();
        }    
    });
}