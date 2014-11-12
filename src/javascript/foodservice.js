var $ = require('jQuery');


function FoodService(config) {
  var CONFIG = config;
  var hasLocalStorage = localStorage !== undefined;
  
  this.getRestaurantInfo = function (index, callback) {
    $.ajax({dataType: "jsonp",
            url: getRestServiceUrlFor(CONFIG),
            success: function(data) { 
              callback(parseRestaurant(data, index)); 
            }
    });
  }

  function parseRestaurant(data, index) {
    if (data.restaurants && data.restaurants[index]) {
      return data.restaurants[index];
    }
    return {};
  }

  function getRestServiceUrlFor(CONFIG) {
    return CONFIG.REST_URL + "?restaurant=unica&year=2014&week=45";
  }

  this.getFoodsFor = function (year, week, weekday, callback) {
    $.ajax({dataType: "jsonp",
            url: getRestServiceUrlFor(CONFIG),
            success: function(data) { 
              callback(parseFoodForADay(data, weekday)); 
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
