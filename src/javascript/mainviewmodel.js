var Ractive = require('ractive');
var RactiveTouch = require('ractive-touch');
var brickwork = require('./brickwork.shim');
var dateUtil = require('./dateutil.js');

function MainViewModel(foodService) {
  var WEEK_DAY_NAMES = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai'];
  var dailyFoodView, wall, today;

  var today = new Date();
  initRactive();
  initWall();
  showFoodsFor(today);

  function initRactive() {
    var selectedDay = new Date(today.getTime()),
        selectedWeekDayName = WEEK_DAY_NAMES[dateUtil.getWeekDayNumber(today)];

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
      showRestaurantInfoClicked: function( event, restaurantName, index ) {
        showRestaurantInfo(restaurantName, index);
      },
      
      navigatePreviousDay: function() {
        var previousDay = this.get('selectedDay');
        previousDay.setDate(previousDay.getDate()-1);

        this.set({
          selectedDay: previousDay,
          selectedWeekDayName: WEEK_DAY_NAMES[dateUtil.getWeekDayNumber(previousDay)]
        });

        showFoodsFor(previousDay);
      },
      navigateNextDay: function() {
        var nextDay = this.get('selectedDay');
        nextDay.setDate(nextDay.getDate()+1);

        this.set({
          selectedDay: nextDay,
          selectedWeekDayName: WEEK_DAY_NAMES[dateUtil.getWeekDayNumber(nextDay)]
        });

        showFoodsFor(nextDay);
      },
    });
  }

  function initWall() {
    wall = new brickwork("#food-container");

    wall.reset({
      animate: false,
      selector: '.item',
      cellH: 'auto',
      onResize: function() {
          wall.fitWidth();
      },
    });

    wall.fitWidth();
  }

  function showRestaurantInfo(restaurantName, index) {
    var isInfoSet = dailyFoodView.get('foodsByRestaurant[' + index + '].restaurantInfo') !== undefined;
    var isInfoShown = dailyFoodView.get('foodsByRestaurant[' + index +'].isInfoShown');

    if(!isInfoShown) {
      if(!isInfoSet) {
        foodService.getRestaurantInfo(index, function(restaurantInfo, error) {
          if(!error) {
            dailyFoodView.set('foodsByRestaurant[' + index + '].restaurantInfo', restaurantInfo);
          }

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
};

module.exports = MainViewModel;