var order = function() {
	var totalMeal;
	var vegetarian;
	var glutenFree;
	var nutFree;
	var fishFree;
};

var restaurant = function() {
	var totalMeal;
	var serve;
	var vegetarian;
	var glutenFree;
	var nutFree;
	var fishFree;
};

var json_TestInput = '[{}, {}, {}, {}]';
var json_RestaurantList = '[{"Restaurant": "A", "Serve": 40, "Vegetarian": 4, "GlutenFree": 0, "NutFree": 0, "FishFree": 0, "Rating": 5}, {"Restaurant": "B", "Serve": 100, "Vegetarian": 20, "GlutenFree": 20, "NutFree": 0, "FishFree": 0, "Rating": 3}]';
var restaurantsVisited;

var response;

// testing
response = JSON.parse(json_RestaurantList);
function ManualInput() {
	//RetrieveData();
	order.totalMeal = document.getElementByName("totalMeal").value;
	order.vegetarian = document.getElementByName("vegetarian").value;
	order.glutenFree = document.getElementByName("glutenFree").value;
	order.nutFree = document.getElementByName("nutFree").value;
	order.fishFree = document.getElementByName("fishFree").value;
}

var stop = false;
function fulfillOrder() {
	var currRest = function() { var name, rating; };
	
	for each (var e in response) {
		if (e.Rating === 5) {

		}
		if (e.Rating === 4) {}
		if (e.Rating === 3) {}
		if (e.Rating === 2) {}
		if (e.Rating === 1) {}
	}

	if (!stop) {
		fulfillOrder();
	}
}

function AutoTests() {
	//RetrieveData();
}

function RetrieveData() {
	RetrieveData(null);
}
function RetrieveData(req) {
	if (req === null) {
		req = "";
	}
	
	var xhttp = XMLHttpRequest();
	xhttp.open("POST", "http://localhost:3000/restaurants"+req, true);
	xhttp.setRequestheader("Content-type", "application/json");
	xhttp.send();
	response = JSON.parse(xhttp.responseText);
}

console.log(response.Restaurant);
console.log(response.length);