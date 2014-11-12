var Ractive = require('ractive');
var RactiveTouch = require('ractive-touch');
var $ = require('jQuery');
var brickwork = require('./brickwork.shim');
var bootstrap = require('bootstrap');
var _ = require('lodash');
var CONFIG = require('../config/config.json');
var PageSlider = require('./pageslider.js');

$(function() {
  initViewModels();
  initWall();
  showFoodsFor(selectedWeekDay);
});

var WEEK_DAY_NAMES = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai'];
var today, selectedDay, selectedWeekDay, selectedWeekDayName;
var foodView, navigationView, wall, slider;

function initViewModels() {
  today = new Date();
  selectedDay = new Date(today.getTime());
  selectedWeekDay = getWeekDayNumber(selectedDay);
  selectedWeekDayName = WEEK_DAY_NAMES[selectedWeekDay];
  var $mainContent = $('#main-content');
  slider = new PageSlider($('body'));

  function navigatePreviousDay() {
    var previousDay = foodView.get('selectedDay');
    previousDay.setDate(previousDay.getDate()-1);

    foodView.set({
      selectedDay: previousDay,
      selectedWeekDay: getWeekDayNumber(previousDay),
      selectedWeekDayName: WEEK_DAY_NAMES[getWeekDayNumber(previousDay)]
    });

    slider.slidePageFrom($mainContent, "right");
    showFoodsFor(getWeekDayNumber(previousDay));
  }

  function navigateNextDay() {
    var nextDay = foodView.get('selectedDay');
    nextDay.setDate(nextDay.getDate()+1);

    foodView.set({
      selectedDay: nextDay,
      selectedWeekDay: getWeekDayNumber(nextDay),
      selectedWeekDayName: WEEK_DAY_NAMES[getWeekDayNumber(nextDay)]
    });

    showFoodsFor(getWeekDayNumber(nextDay));
    slider.slidePageFrom($mainContent,"left");
  }

  foodView = new Ractive({
    el: 'body',
    template: require('../templates/page-template.html'),
    data: {
      foodsByRestaurant : [],
      loadingFoods: false,
      today : today,
      selectedDay: selectedDay,
      selectedWeekDay: selectedWeekDay,
      selectedWeekDayName: selectedWeekDayName,
      formatDate: formatDate,
      formatPrices: formatPrices
    }
  });

  foodView.on({
    showRestaurantInfoClicked: function( event, restaurantName, index) {
      showRestaurantInfo(restaurantName, index);
    },
    navigatePreviousDay: navigatePreviousDay,
    navigateNextDay: navigateNextDay
  });
}

function showRestaurantInfo(restaurantName, index) {
  var isInfoSet = foodView.get('foodsByRestaurant[' + index + '].restaurantInfo') !== undefined;
  var isInfoShown = foodView.get('foodsByRestaurant[' + index +'].isInfoShown');

  if(!isInfoShown) {
    if(!isInfoSet) {
      $.ajax({
          //crossDomain: true,
          dataType: "jsonp",
          url: getRestServiceUrlFor()

          }).done(function(data) {
            if(data.restaurants) {
              var restaurantInfos = data.restaurants;
              foodView.set('foodsByRestaurant[' + index + '].restaurantInfo', restaurantInfos[index]);
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
  foodView.set('foodsByRestaurant[' + index +'].isInfoShown', isVisible);
  wall.refresh();
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
          wall.refresh();
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
      crossDomain: true,
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
  return CONFIG.REST_URL + "?restaurant=unica&year=2014&week=45"
}

