var $ = require('jQuery');


function FoodService(CONFIG) {
  var hasLocalStorage = window.localStorage !== undefined;
  
  /*
  * @param {Function} callback like function(data, error)
  */
  this.getRestaurantInfo = function (index, callback) {
    $.ajax({dataType: "jsonp",
            url: getRestServiceUrlFor(2014, 45),
            success: function(data) { 
              callback(parseRestaurant(data, index), null); 
            },
            error: function() {
              callback(null, "error");
            }
    });
  }

  function parseRestaurant(data, index) {
    if (data.restaurants && data.restaurants[index]) {
      return data.restaurants[index];
    }
    return {};
  }

  function getRestServiceUrlFor(year, week) {
    return CONFIG.REST_URL + "?restaurant=unica&year=" + year + "&week=" + week;
  }

  /*
  * @param {Function} callback like function(data, error).
  */
  this.getFoodsFor = function (year, week, weekday, callback) {
    $.ajax({dataType: "jsonp",
            url: getRestServiceUrlFor(year, week),
            success: function(data) { 
              callback(parseFoodForADay(data, weekday), null); 
            },
            error: function() {
              callback(null, "error");
            }
    });
  }

  function parseFoodForADay(data, weekday) {
    if(data.foodsByDay[weekday]) {
      return data.foodsByDay[weekday].foodsByRestaurant;
    }
    return [];
  }
 
};

module.exports = FoodService;
