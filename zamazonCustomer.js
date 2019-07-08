const mysql = require("mysql");
const inquirer = require("inquirer");

//connection info for DB
var connection = mysql.createConnection({
	host: "Localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "zamazon_db"
});

//connect to mysql, database and display products 
connection.connect(function(err){
	if (err) throw err;
	console.log("connected as id: "+ connection.threadId);
	showProducts();
});

function showProducts() {
	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
		console.log("\nWELCOME TO ZAMAZON, Your Amazon Alternative!")
		console.log(results);
		connection.end();
	})
}