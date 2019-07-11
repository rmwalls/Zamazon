const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
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
            showProducts(); 
        } else {
            endProgram();
        }
    });
} // end start

// end the program (if Exit selected)
function endProgram() {
	inquirer.prompt({
		name: "end",
		type: "list",
		message: "Are you sure you want to exit?",
		choices: ["Yes", "No"]
}).then(function(answer){
		if (answer.end === "Yes") {
		console.log("choice = " + answer.end);
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
        itemsListArray = []
        for(var i = 0; i < result.length; i++){
			itemsListArray.push(result[i])
			console.table("Available Items", itemsListArray);
		} //end for
    chooseProduct(itemsListArray); //pass products to next function
    }); //end query
} // end showProducts 

// select product and quantity
function chooseProduct() {
 	inquirer.prompt([
	{
 		name: "toBuy",
 		message:"Enter ITEM_ID of item you wish to purchase:",
     	type: "number"
	 }, 
 	{
	 name: "amount",
	 type: "number",
	 message: "How many do you want?"
	 }
	]
	).then(function(answer) {
		var item = parseInt(answer.toBuy);
		var quantity = parseInt(answer.amount);
		let query = `SELECT * FROM products WHERE item_id = ?`;
		connection.query(query, item_id, function(err, res){
			if (err) throw err ;{
				if(isNaN(item)) {
					console.log("Invalid item, please try again");
					chooseProduct();
				}
				if (quantity > parseInt(res.stock_quantity)) {
					} else {
						console.log("Your request exceeds the amount available, please try again");
						chooseProduct();
				} // end else
			} // end if
		}); //end connectionQuery
	}) //end then
} //end chooseProduct

//get item they want to buy then askuantity
	//check that entry is valid(parseInt the id number)
		// if not valid, sorry that is not an item, please try again, redisplay chooseProduct
	// check that quantity is available
		// if zero, sorry out of stock
		// if not enough, sorry there are only ___ available
		//Do you want to buy those?
			// yes, continue to buyProduct
			//no, redisplay

//go here if product available and customer continues
// function buyProduct(){
//} end buyProduct