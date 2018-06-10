const database = require('../services/database.js');
 
const baseQuery = 
 `select restaurant "Restaurant",
    server "Serve",
    vegetarian "Vegetarian",
    gluten_free "GlutenFree",
    nut_free "NutFree",
    fish_free "FishFree",
    rating "Rating"
  from restaurants`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.restaurant = context.id;
 
    query += `\nwhere restaurant = :restaurant`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;