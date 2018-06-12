Name: MOS (Meal Ordering System)
Author: Alan Lam

Description: This program intends to take order from users, and return the best possible result from the available restaurant list. Also, the interface has an option for automated test, to test some of the edge cases for this program.

HOW TO USE: run the 'node index.js' in cmd line. open index.html in browser.

***Currently the program only works with the json formatted variable in the JavaScript file.

***For testing with server, please comment out Line 82, 83, 134, and uncomment Line 54, 79, 88.

***Server is currently not functional. 

NOTE: If testing with server, please use port 3000.

Thought process for server:
Listen on port 3000. When receive a GET request from client, based on the GET request perform a SQL query. For example, http://localhost:3000/api/restaurants, ReST api will parse the request based on URL, in this case its only 'restaurants', SQL Query: SELECT * FROM restaurants. Then, respond in json format.

Obstacles:
- I followed an online guide to create a server using node js. It does provide a step by step tutorial on creating a Oracle DB with ReST API. However, I was unable to test it due to the error from the oracleDB plug-in. I have attempted multiple times uninstalling and reinstalling the plugin, does not seem to have an effect.
- CORS -> Need to include Access-Control-Allow-Origin header in the request header ***SOLVED w/ cors with npm
- Empty response from Server

Thought process of the implementation of server:
Using node js to implement ReST API for the server. ReST API essentially respond in json format based on the request from the client. When request(s) received from client, server will perform query to retrieve the desired information (SELECT "if field specified" FROM restaurants). Then return the result in json format.

Idea on the abstract structure of server:
-index.js that handles GET request from client

-Call another module to handle the path from the request url

-In this scenario there is only two possible cases: restaurants or testinputs

-Used the preselected query to retrieve data from DataBase

-Pass the result back to index.js, return the result via response.send()

Steps taken to overcome obstacles:
	Back to the basic, implement a basic server that listens on port 3000. -> Implement method that handle get requests


