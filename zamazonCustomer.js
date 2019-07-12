const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const chalk = require('chalk');

var itemsListArray;

//================= END of REQUIRE Section ===================================

//connection info for zamazon DB
var connection = mysql.createConnection({
	host: "Localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "zamazon_db"
});

//connect to mysql and start program
connection.connect(function(err){
	if (err) throw err;
	console.log("connected as id: "+ connection.threadId);
	start();
}); 

//========================== END of DATABASE INITIALIZATION ===========================

// Which functionality is requested - may later add supervisor & manager
function start() {
	console.log("\nWELCOME TO ZAMAZON, Your Amazon Alternative!")
    inquirer.prompt({
        name: "which",
        type: "list",
        message: "Would you like to place an Order or Exit?",
        choices: ["Order", "Exit"]
    }).then(function(answer){
        if (answer.which === "Order") {
            showProducts(); 
        } else {
            endProgram();
        }
    });
} // end start

// end the program if Exit selected
function endProgram() {
	inquirer.prompt({
		name: "end",
		type: "list",
		message: "Are you sure you want to exit?",
		choices: ["Yes", "No"]
	}).then(function(answer){
		if (answer.end === "Yes") {
		//console.log("choice = " + answer.end);
		console.log("Thank you for visiting Zamazon!");
		connection.end()
	}else {
		showProducts();
		} //end if/else
	}); //end then
} //end endProgram


// function to show products to customers ++++ products displayed
function showProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity > 0", function(err, result) {
        if (err) throw console.log("Error: " + err);
        itemsListArray = []
        for(var i = 0; i < result.length; i++){
			itemsListArray.push(result[i])
		} //end for
		console.table("\nAvailable Items", itemsListArray);
    	chooseProduct(); 
    }); //end query
} // end showProducts 

// select product and quantity
function chooseProduct(){
	inquirer.prompt([
   		{
			name: "toBuy",
			type: "number",
			message:"Enter ITEM_ID of item you wish to purchase:"
		}, 
		{
			name: "amount",
			type: "number",
			message: "How many do you want?"
		} //end inq
   ]
   ).then(function(answer) {
	   let itemID = parseInt(answer.toBuy);
	   //console.log("item is " + itemID);
	   let quantity = parseInt(answer.amount);
	   //console.log("quant is " + quantity);
	   buyProduct(itemID, quantity);
   })
}

function buyProduct(id, quantity) {
	//console.log("id is " + id + " quantity is " + quantity);
    connection.query("SELECT * FROM products WHERE item_id = " + id, function (err, res) {
        if (err) { console.log(err); }
        //console.log(res[0].price);
			if (quantity <= res[0].stock_quantity) {
				let totalCost = parseFloat(res[0].price * quantity).toFixed(2);
				console.log(chalk.green("\nYour total cost for " + quantity + " " + res[0].product_name + " is $" + totalCost + "."));
				console.log("\n")
				connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantity + " WHERE item_id = " + id);
				console.log(chalk.magenta("Thank you for shopping at Zamazon! Come back again!\n"));
				connection.end()
			} else {
				console.log("\n")
				console.log(chalk.bgRed.bold("We do not have enough in stock. Please try again."))
				console.log("\n")
				showProducts();
			}
    });
};