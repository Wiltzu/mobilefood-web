var Ractive = require('ractive');
var RactiveTouch = require('ractive-touch');
var $ = require('jQuery');
var brickwork = require('./brickwork.shim');
var bootstrap = require('bootstrap');
var CONFIG = require('../config/config.json');
var PageSlider = require('./pageslider.js');
var FoodService = require('./foodservice.js');
var dateUtil = require('./dateutil.js');

$(function() {
  initViewModels();
  initWall();
  initFoodService();
  showFoodsFor(today);
});

var WEEK_DAY_NAMES = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai'];
var today, selectedDay, selectedWeekDayName;
var dailyFoodView, navigationView, wall, slider, foodService;

function initFoodService() {
  foodService = new FoodService(CONFIG);
}

function initViewModels() {
  today = new Date();
  selectedDay = new Date(today.getTime());
  selectedWeekDayName = WEEK_DAY_NAMES[dateUtil.getWeekDayNumber(today)];
  var $mainContent = $('#main-content');
  slider = new PageSlider($('body'));

  function navigatePreviousDay() {
    var previousDay = dailyFoodView.get('selectedDay');
    previousDay.setDate(previousDay.getDate()-1);

    dailyFoodView.set({
      selectedDay: previousDay,
      selectedWeekDayName: WEEK_DAY_NAMES[dateUtil.getWeekDayNumber(previousDay)]
    });

    slider.slidePageFrom($mainContent, "right");
    showFoodsFor(previousDay);
  }

  function navigateNextDay() {
    var nextDay = dailyFoodView.get('selectedDay');
    nextDay.setDate(nextDay.getDate()+1);

    dailyFoodView.set({
      selectedDay: nextDay,
      selectedWeekDayName: WEEK_DAY_NAMES[dateUtil.getWeekDayNumber(nextDay)]
    });

    showFoodsFor(nextDay);
    slider.slidePageFrom($mainContent,"left");
  }

  dailyFoodView = new Ractive({
    el: 'body',
    template: require('../templates/page-template.html'),
    data: {
      foodsByRestaurant : [],
      loadingFoods: false,
      today : today,
      selectedDay: selectedDay,
      selectedWeekDayName: selectedWeekDayName,
      formatDate: formatDate,
      formatPrices: formatPrices
    }
  });

  dailyFoodView.on({
    showRestaurantInfoClicked: function( event, restaurantName, index) {
      showRestaurantInfo(restaurantName, index);
    },
    navigatePreviousDay: navigatePreviousDay,
    navigateNextDay: navigateNextDay
  });
}

function showRestaurantInfo(restaurantName, index) {
  var isInfoSet = dailyFoodView.get('foodsByRestaurant[' + index + '].restaurantInfo') !== undefined;
  var isInfoShown = dailyFoodView.get('foodsByRestaurant[' + index +'].isInfoShown');

  if(!isInfoShown) {
    if(!isInfoSet) {
      $.ajax({
          //crossDomain: true,
          dataType: "jsonp",
          url: getRestServiceUrlFor()

          }).done(function(data) {
            if(data.restaurants) {
              var restaurantInfos = data.restaurants;
              dailyFoodView.set('foodsByRestaurant[' + index + '].restaurantInfo', restaurantInfos[index]);
            }

          }).fail(function(jqXHR, textStatus) {
            //     
          
          }).always(function() {
            setRestaurantInfoVisible(index, true);
        });
    } else {
      setRestaurantInfoVisible(index, true);
    }
  } else {
    setRestaurantInfoVisible(index, false);
  }
}

function setRestaurantInfoVisible(index, isVisible) {
  dailyFoodView.set('foodsByRestaurant[' + index +'].isInfoShown', isVisible);
  wall.refresh();
}

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth();
  month++;
  var year = date.getFullYear();
  return day + "." + month + "." + year;
}

function formatPrices(prices) {
  return prices.join(' / ');
}

function initWall() {
  wall = new brickwork("#food-container");

  wall.reset({
      animate: true,
      selector: '.item',
      cellH: 'auto',
      onResize: function() {
          wall.refresh();
      }
  });

  wall.fitWidth();
}

function showFoodsFor(date) {
  dailyFoodView.set('loadingFoods', true);
  var year = date.getFullYear(), 
      week = dateUtil.getWeek(date), 
      weekday = dateUtil.getWeekDayNumber(date);

  foodService.getFoodsFor(year, week, weekday, function(foods, error) {
    if(!error) {
      dailyFoodView.set('foodsByRestaurant', foods);
    } else {
      dailyFoodView.set('foodsByRestaurant', []); 
    }
    
    dailyFoodView.set('loadingFoods', false);
    wall.refresh();
  });

  // if(localStorage && weekday in localStorage) {
  //   dailyFoodView.set('foodsByRestaurant', JSON.parse(localStorage[weekday]));
  //   dailyFoodView.set('loadingFoods', false);
  //   wall.refresh();
  
  // } else {
  //   $.ajax({
  //     crossDomain: true,
  //     dataType: "jsonp",
  //     url: getRestServiceUrlFor()

  //     }).done(function(data) {
  //       if(data.foodsByDay[weekday]) {
  //         dailyFoodView.set('foodsByRestaurant', data.foodsByDay[weekday].foodsByRestaurant);
  //         if(localStorage) {
  //           localStorage.setItem(weekday, JSON.stringify(data.foodsByDay[weekday].foodsByRestaurant));
  //         }
  //       } else {
  //         dailyFoodView.set('foodsByRestaurant', []);
  //       }

  //     }).fail(function(jqXHR, textStatus) {
  //       dailyFoodView.set('foodsByRestaurant', []);      
      
  //     }).always(function() {
  //       dailyFoodView.set('loadingFoods', false);
  //       wall.refresh();
  //   });
  // }

}

function getRestServiceUrlFor() {
  return CONFIG.REST_URL + "?restaurant=unica&year=2014&week=45"
}

