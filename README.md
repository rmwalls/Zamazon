# Zamazon
Node.js &amp; MySQL Homework Assignment

The purpose of this homework assignment is to practice working with Node.js and MySQL. This is a very simple command-line
interface for interacting with the database using Node in an amazon-like way.

The program welcomes the user and asks whether they wish to order and item or exit the program. If they choose to place an order
a list of items (which was pre-created using the zamazon.sql file). Each item has a stock quantity and price. 

After the user enters the id of the item they want and the quantity they wish to order, the program verifies that there is sufficient stock
to fill the order. If there is, the order is processed after displaying the price and updating the stock on hand. If there is not 
sufficient stock, the order is cancelled and the user is prompted to try again. 

# Technologies Used
<ul>
<li> Node.js
<li> MySQL
<li> Inquirer
<li> console.table
<li> Chalk
<li> Javascript
</ul>

# Enhancements Planned
<ul>
<li> After order is completed, ask user if they wish to make another purchase.
<li> Combine multiple purchases into one order.
<li> Add a "Manager" module that will allow:
    <ul>
    <li> View Products for Sale
    <li> View Low Inventory
    <li> Add to Inventory
    <li> Add New Product
    </ul>
<li> Add a "Supervisor module that will allow:
    <ul>
    <li> View Product Sales by Department
    <li> Create New Department
    </ul>
</ul>

# View Video of Program

<video autoplay>
  <source src="video/Zamazon.mp4" type="video/mp4">
Your browser does not support the video tag so here's a link <a href="video/Zamazon.mp4>Zamazon Video</a>
</video>