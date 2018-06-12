// reference: https://jsao.io/2018/04/creating-a-rest-api-handling-get-requests/

const express = require('express');
const router = new express.Router();
const restaurants = require('../controllers/restaurants.js');
 
router.route('/restaurants/:id?')
  .get(restaurants.get);
 
module.exports = router;