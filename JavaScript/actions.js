/*
File Name: 		actions.js
Description: 	This file contains functions to incorporate the logic behind the Meal Ordering
				System.
Author:  		Alan Lam
*/

// Global Variables
var order = function() {
	var vegetarian, glutenFree, nutFree, fishFree, wo_Restrict;
};

var restaurant = function() {
	var name, serve, vegetarian, glutenFree, nutFree, fishFree, others, rating;
};

// Local Testing.
var json_RestaurantList = '[{"Restaurant": "A", "Serve": 40, "Vegetarian": 4, "GlutenFree": 0, "NutFree": 0, "FishFree": 0, "Rating": 5}, {"Restaurant": "B", "Serve": 100, "Vegetarian": 20, "GlutenFree": 20, "NutFree": 0, "FishFree": 0, "Rating": 3}]';

var round = Math.round;
var receipt = new Array(); // an array used to store order from each restaurant
var response; // used to store the parsed json respond
var res_raw = null;
var receiptStr = ""; // used for printing in HTML

/*-----------retrieving data from Server with ReST API-----------*/
/*
Function Name: 	RetrieveData()
Description: 	The following functions will send a request from the desired host,
				store the json respond in 'var response'.
*/
function RetrieveData(req) {
	var xhttp = new XMLHttpRequest();
	// 3000/restaurants
	xhttp.onreadystatechange = function() {
	  	if (xhttp.readyState == 4 && xhttp.status == 200) {
	  		res_raw = xhttp.responseText;
	 	}
	};
	xhttp.open("GET", "http://localhost:3000/api/"+req, false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(null);
	
	response = JSON.parse(res_raw);
	console.log(response);
}
/*-----------retrieving data from Server with ReST API-----------*/

/*
Function Name: 	ManualInput()
Description: 	The following fuction will store the inputs from HTML form, then create
				an instance of order. Finally, call the execute() function to finish the
				rest of the work.
*/
function ManualInput() {
	console.log("ManualInput()");

	var o = new order;
	o.vegetarian = document.getElementById("vegetarian").value;
	o.glutenFree = document.getElementById("glutenFree").value;
	o.nutFree = document.getElementById("nutFree").value;
	o.fishFree = document.getElementById("fishFree").value;
	o.wo_Restrict = document.getElementById("totalMeal").value - o.vegetarian - o.glutenFree - o.nutFree - o.fishFree;
	receiptStr += "<p>-------------Result starts!-------------</p>";
	printOrder(o);
	// Please uncomment the line below to retrieve data from server.
	// RetrieveData("restaurants"); // this line is used to retrieve list of available restaurants.
	execute(o);
	receiptStr += "<p>-------------Result ends!-------------</p>";
	document.getElementById("result").innerHTML = receiptStr;
	receipt = new Array();
	receiptStr = "";
}
/*
Function Name: 	AutoTests()
Description: 	The following fuction will retrieve the testinputs from server using Retrieve().
				Then, parse the test inputs into an array of type 'order' using parseTestInputs().
				Finally, a for-loop call function 'execute()', to whether the existing restaurant
				list can fulfill the order.
*/
function AutoTests() {
	console.log("AutoTests()");
	// Please uncomment the line below to retrieve data from server.
	// RetrieveData("testinputs"); // this line is used to retrieve list of test orders

	// below --> only for local testing (without server)
	testJSON = '[{"TotalServing": 30,"Vegetarian": 4,"GlutenFree": 0,"NutFree": 0,"FishFree": 0},{"TotalServing": 20,"Vegetarian": 4,"GlutenFree": 3,"NutFree": 1,"FishFree": 1},{"TotalServing": 100,"Vegetarian": 23,"GlutenFree": 44,"NutFree": 21,"FishFree": 4},{"TotalServing": 300,"Vegetarian": 40,"GlutenFree": 40,"NutFree": 50,"FishFree": 2}]'
	response = JSON.parse(testJSON);

	var testInputs = parseTestInputs();

	// Please uncomment the line below to retrieve data from server.
	// RetrieveData("restaurants"); // this line is used to retrieve list of available restaurants.
	receiptStr += "<p>-------------Result starts!-------------</p><br> Automated Tests: <br><br>";

	for (var i = 0; i < testInputs.length; i++) {
		console.log(testInputs.length);
		printOrder(testInputs[i]);
		execute(testInputs[i]);
	}
	receiptStr += "<p>-------------Result ends!-------------</p>";
	document.getElementById("result").innerHTML = receiptStr;
	receipt = new Array();
	receiptStr = "";
}
/*
Function Name: 	parseTestInputs()
Description: 	The following fuction will parse the test inputs into an array of type 'order'.
				Then, return the array 'testInputs' for automated test purposes.
*/
function parseTestInputs() {
	console.log("parseTestInputs()");
	var testInputs = new Array();
	var temp = response;
	for (var i = 0; i < temp.length; i ++) {
		var o = new order;
		o.vegetarian = temp[i].Vegetarian;
		o.glutenFree = temp[i].GlutenFree;
		o.nutFree = temp[i].NutFree;
		o.fishFree = temp[i].FishFree;
		o.wo_Restrict = temp[i].TotalServing - o.vegetarian - o.glutenFree - o.nutFree - o.fishFree;
		
		testInputs.push(o);
	}
	return testInputs;
}
/*
Function Name: 	execute(parameter type: order)
Description: 	The following function acts as the core of the whole ordering system. It will
				call another function to parse the restaurant list in json format, then it
				will store each element from the restaurant list into an array in type
				'restaurant'. After the completion of parsing, this function will bubble sort
				the array in restaurant type base on the rating of the restaurant. This
				function will then process the order base on the restaurant array. Finally,
				append the result into an empty string, so the HTML will display the result.
*/
function execute(order) {
	console.log("execute()");

	// please comment the line below if not using local testing.
	response = JSON.parse(json_RestaurantList);

	var resList = parseResList(response);
	bubbleSort(resList);
	OrderProcessing(order, resList);
	printReceipt(receipt);
}

/*
Function Name: 	parseResList(parameter: Parsed .json)
Description: 	The following fuction will parse the json respond from server, into an array
				restaurant type. then return the result list.
*/
function parseResList(response) {
	console.log("parseResList()");
	var rList = response;
	var resList = new Array();
	for (var i = 0; i < rList.length; i ++) {
		var res = new restaurant;
		res.name = rList[i].Restaurant;
		res.serve = rList[i].Serve;
		res.vegetarian = rList[i].Vegetarian;
		res.glutenFree = rList[i].GlutenFree;
		res.nutFree = rList[i].NutFree;
		res.fishFree = rList[i].FishFree;
		res.rating = rList[i].Rating;
		res.others = res.serve - res.vegetarian - res.glutenFree - res.nutFree - res.fishFree;
		console.log(res);
		resList.push(res);
	}
	return resList;
}

/*
Function Name: 	bubbleSort(Parameter Type: Array)
Description: 	The following fuction will bubble sort the array in type 'restaurant' base
				on the restaurant's rating.
*/
function bubbleSort(objArray) {
	console.log("bubbleSort()");
	var trigger;
	var notDone = true;

	while (notDone) {
		trigger = false;
		for (var i = 0; i < objArray.length; i++) {
			if (i+1 === objArray.length) {
				break;
			}
			if (objArray[i].rating < objArray[i+1].rating) {
				var temp = objArray[i];
				objArray[i] = objArray[i+1];
				objArray[i+1] = temp;
				trigger = true;
			}
		}
		if (!trigger) {
			notDone = false;
		}
	}
}

/*
Function Name: 	OrderProcessing(Parameter Type: order, Array in type 'Restaurant')
Description: 	The following fuction will fulfill the order based on the sorted
				restaurant list. During the process of fulfilling the order, this
				function will call function 'checkQuantity()' to find out the 
				quantity needed for each type of meal from each restaurant
*/
function OrderProcessing(order, resList) {
	console.log("OrderProcessing()");
	var remainingOrder = order;
	var totalServing_wo_Restriction;
	var res;
	var totalMeal = parseInt(remainingOrder.vegetarian) + parseInt(remainingOrder.glutenFree) + parseInt(remainingOrder.nutFree) + parseInt(remainingOrder.fishFree) + parseInt(remainingOrder.wo_Restrict);
	
	// if the input from user is valid (total order >= meal w/ restrictions)
	if (remainingOrder.wo_Restrict >= 0 && totalMeal != 0) {
		for (var i = 0; i < resList.length; i++) {
			res = new restaurant;
			totalServing_wo_Restriction = resList[i].serve - resList[i].vegetarian - resList[i].glutenFree - resList[i].nutFree - resList[i].fishFree;
			res.name = resList[i].name;
			res.vegetarian = checkQuantity(remainingOrder.vegetarian, resList[i].vegetarian);
			remainingOrder.vegetarian -= res.vegetarian;
			res.glutenFree = checkQuantity(remainingOrder.glutenFree, resList[i].glutenFree);
			remainingOrder.glutenFree -= res.glutenFree;
			res.nutFree = checkQuantity(remainingOrder.nutFree, resList[i].nutFree);
			remainingOrder.nutFree -= res.nutFree;
			res.fishFree = checkQuantity(remainingOrder.fishFree, resList[i].fishFree);
			remainingOrder.fishFree -= res.fishFree;
			res.others = checkQuantity(remainingOrder.wo_Restrict, totalServing_wo_Restriction);
			remainingOrder.wo_Restrict -= res.others;
			res.serve = parseInt(res.vegetarian) + parseInt(res.glutenFree) + parseInt(res.nutFree) + parseInt(res.fishFree) + parseInt(res.others);
			res.rating = resList[i].rating;
			receipt.push(res);
		}
	}
	else {
		receipt = new Array();
	}
	// if there is anything remaining in the order, empty the current receipt variable.
	if (remainingOrder.vegetarian > 0 || remainingOrder.glutenFree > 0 || remainingOrder.nutFree > 0 || remainingOrder.fishFree > 0 || remainingOrder.wo_Restrict > 0) {
		receipt = new Array();
	}
}

/*
Function Name: 	checkQuantity(Parameter Type: Variable in order, Variable in Restaurant)
Description: 	The following fuction will return the quantity needed to order for the
				desired type of meal from restaurant specified as input.
*/
function checkQuantity(demand, supply) {
	console.log("checkQuantity()");
	var quantity = 0;
	if (demand > 0 && supply > 0) {
			if ((demand - supply) >= 0) {
				quantity = supply;
				demand -= supply;
			}
			else {
				quantity = demand;
				demand = 0;
			}
		}
	return quantity;
}

/*
Function Name: 	printReceipt(parameter type: receipt)
Description: 	The following fuction will create a string according to the result in
				the 'receipt' variable.
*/
function printReceipt(receipt) {
	var result = "";
	result += "Receipt Detail:<br>"
	if (receipt.length === 0) {
		result += "Sorry, your order cannot be completed! Please try again!<br><br>";
	}
	else {
		for (var i = 0; i < receipt.length; i++) {
			result += "Restaurant Name: " + receipt[i].name + ",<br>";
			result += "Total Serving: " + receipt[i].serve + ",<br>";
			result += "Total Vegetarian Meal(s): " + receipt[i].vegetarian + ",<br>";
			result += "Total Gluten-Free Meal(s): " + receipt[i].glutenFree + ",<br>";
			result += "Total Nut-Free Meal(s): " + receipt[i].nutFree + ",<br>";
			result += "Total Fish-Free Meal(s): " + receipt[i].fishFree + ",<br>";
			result += "Total Others Meal(s): " + receipt[i].others + ",<br>";
			result += "Restaurant Rating: " + receipt[i].rating + ".<br>";
			result += "<br>";
		}
	}
	receiptStr += result;
}

/*
Function Name: 	printOrder(parameter type: order)
Description: 	The following fuction will create a string according to the order.
*/
function printOrder(order) {
	var result = "Order Detail:<br>";
	var o = order;
	var totalMeal = parseInt(o.vegetarian) + parseInt(o.glutenFree) + parseInt(o.nutFree) + parseInt(o.fishFree) + parseInt(o.wo_Restrict);
	result += "Total Meal(s) Ordered: " + totalMeal +",<br>";
	result += "Total Vegetarian Meal(s) Ordered: " + o.vegetarian +",<br>";
	result += "Total Gluten-Free Meal(s) Ordered: " + o.glutenFree +",<br>";
	result += "Total Nut-Free Meal(s) Ordered: " + o.nutFree +",<br>";
	result += "Total Fish-Free Meal(s) Ordered: " + o.fishFree +",<br>";
	result += "Total Others Meal(s) Ordered: " + o.wo_Restrict +".<br><br>";
	receiptStr += result;
}
