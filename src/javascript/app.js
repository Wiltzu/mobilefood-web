
var Ractive = require('ractive');
var RactiveTouch = require('ractive-touch');
var $ = require('jQuery');
var brickwork = require('./brickwork.shim');
var bootstrap = require('bootstrap');
var _ = require('lodash');
var CONFIG = require('../config/config.json');

$(function() {
  initViewModels();
  initWall();
  showFoodsFor(selectedWeekDay);
});

var WEEK_DAY_NAMES = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai'];
var today, selectedDay, selectedWeekDay, selectedWeekDayName;
var foodView, navigationView, wall;

function initViewModels() {
  today = new Date();
  selectedDay = new Date(today.getTime());
  selectedWeekDay = getWeekDayNumber(selectedDay);
  selectedWeekDayName = WEEK_DAY_NAMES[selectedWeekDay];

  navigationView = new Ractive({
      el: 'day-navigation',
      template: require('../templates/navigation-template.html'),
      data: {
        today : today,
        selectedDay: selectedDay,
        selectedWeekDay: selectedWeekDay,
        selectedWeekDayName: selectedWeekDayName,
        formatDate: formatDate
      }
    });

  function navigatePreviousDay() {
    var previousDay = navigationView.get('selectedDay');
    previousDay.setDate(previousDay.getDate()-1);

    navigationView.set({
      selectedDay: previousDay,
      selectedWeekDay: getWeekDayNumber(previousDay),
      selectedWeekDayName: WEEK_DAY_NAMES[getWeekDayNumber(previousDay)]
    });

    showFoodsFor(getWeekDayNumber(previousDay));
  }

  function navigateNextDay() {
    var nextDay = navigationView.get('selectedDay');
    nextDay.setDate(nextDay.getDate()+1);

    navigationView.set({
      selectedDay: nextDay,
      selectedWeekDay: getWeekDayNumber(nextDay),
      selectedWeekDayName: WEEK_DAY_NAMES[getWeekDayNumber(nextDay)]
    });

    showFoodsFor(getWeekDayNumber(nextDay));
  }

  navigationView.on({
    navigatePreviousDay: navigatePreviousDay,
    navigateNextDay: navigateNextDay
  });

  foodView = new Ractive({
    el: 'main-content',
    template: require('../templates/page-template.html'),
    data: {
      foodsByRestaurant : [],
      loadingFoods: false,
      formatPrices: formatPrices
    }
  });

  foodView.on({
    'showRestaurantInfoClicked': function( event, restaurantName, index) {
      alert(restaurantName + " " + index);
    },
    'navigatePreviousDay': navigatePreviousDay,
    'navigateNextDay': navigateNextDay
  });
}

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth();
  month++;
  var year = date.getFullYear();
  return day + "." + month + "." + year;
}

function getWeekDayNumber(date) {
  var dayStartingSunday = date.getDay();
  return dayStartingSunday == 0 ? 6 : dayStartingSunday - 1;
};

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
          wall.fitWidth();
          //wall.refresh();
      }
  });

  wall.fitWidth();
}

function showFoodsFor(weekday) {
  foodView.set('loadingFoods', true);

  if(localStorage && weekday in localStorage) {
    foodView.set('foodsByRestaurant', JSON.parse(localStorage[weekday]));
    foodView.set('loadingFoods', false);
    wall.refresh();
  
  } else {
    $.ajax({
      //crossDomain: true,
      dataType: "jsonp",
      url: getRestServiceUrlFor()

      }).done(function(data) {
        if(data.foodsByDay[weekday]) {
          foodView.set('foodsByRestaurant', data.foodsByDay[weekday].foodsByRestaurant);
          if(localStorage) {
            localStorage.setItem(weekday, JSON.stringify(data.foodsByDay[weekday].foodsByRestaurant));
          }
        } else {
          foodView.set('foodsByRestaurant', []);
        }

      }).fail(function(jqXHR, textStatus) {
        foodView.set('foodsByRestaurant', []);      
      
      }).always(function() {
        foodView.set('loadingFoods', false);
        wall.refresh();
    });
  }

}

function getRestServiceUrlFor() {
  return CONFIG.REST_URL + "?restaurant=unica&year=2014&week=44"
}

