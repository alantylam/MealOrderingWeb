// reference: https://jsao.io/2018/04/creating-a-rest-api-handling-get-requests/

const express = require('express');
const router = new express.Router();
const employees = require('../controllers/restaurants.js');
 
router.route('/restaurants/:id?')
  .get(employees.get);
 
module.exports = router;