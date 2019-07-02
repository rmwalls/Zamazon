var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = nysql - mysql.createConnection({
	host: "localHost",
	port: 3306,
	user: "root",
	password: "root",
	database: zamazon_db
})

connection.connect(function(err){
	console.log("connected as id: "+connection.threadId);
})


