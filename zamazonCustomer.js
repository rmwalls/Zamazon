const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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

// Which functionality is requested
function start() {
	console.log("\nWELCOME TO ZAMAZON, Your Amazon Alternative!")
    inquirer.prompt({
        name: "which",
        type: "list",
        message: "Please select your program need (*some require id/pw)",
        choices: ["Customer", "Manager*", "Supervisor*", "Exit"]
    }).then(function(answer){
        if (answer.which === "Customer") {
            showProducts(); //works to this point
        } else {
            endProgram();
        }
    });
}


// end program (if Exit selected)
function endProgram() {
	inquirer.prompt({
		name: "end",
		type: "list",
		message: "Are you sure you want to exit?",
		choices: ["Yes", "No"]
}).then(function(answer){
	//if (err) throw console.log("Error: " + err); 
	if (answer === "Yes"){
		console.log("choice = " + answer);
		console.log("Thank you for visiting Zamazon!");
		connection.end()
	}else {
		showProducts();
		} //end if/else
	}); //end then
} //end endProgram


// function to show products to customers
function showProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity > 0", function(err, result) {
        if (err) throw console.log("Error: " + err);
        itemListArray = []
        for(var i = 0; i < result.length; i++){
            console.log("\n Item ID: " + result[i].item_id +
    			"| Product Name: " + result[i].product_name +
                "| Price: " + result[i].price + 
                "| # Available: "  + result[i].stock_quantity);
                itemListArray.push(result[i].item_id)
                }
        chooseProduct(itemListArray);
    });
}  

// select prduct and quantity
function chooseProduct() {
 	inquirer.prompt({
 		name: "toBuy",
 		type: "input",
 		message: "Please enter the ID NUMBER of the item you wish to purchase:"
 }).then(answer)
	 console.log("answer is " + answer);
	 connection.end();
	//get item they want to buy then ask quantity
	//check that entry is valid(parseInt the id number)
		// if not valid, sorry that is not an item, please try again, redisplay chooseProduct
	// check that quantity is available
		// if zero, sorry out of stock
		// if not enough, sorry there are only ___ available
		//Do you want to buy those?
			// yes, continue to buyProduct
			//no, redisplay

  } //end chooseProduct


//go here if product available and customer continues
// function buyProduct(){

// } //end buyProduct