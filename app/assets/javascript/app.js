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
      template: '#navigation-template',
      data: {
        today : today,
        selectedDay: selectedDay,
        selectedWeekDay: selectedWeekDay,
        selectedWeekDayName: selectedWeekDayName,
        formatDate: formatDate    
      }
    });

  navigationView.on({
    navigatePreviousDay: function() {
      var previousDay = navigationView.get('selectedDay');
      previousDay.setDate(previousDay.getDate()-1);

      navigationView.set({
        selectedDay: previousDay,
        selectedWeekDay: getWeekDayNumber(previousDay),
        selectedWeekDayName: WEEK_DAY_NAMES[getWeekDayNumber(previousDay)]
      });

      showFoodsFor(getWeekDayNumber(previousDay));
    },
    navigateNextDay: function() {
      var nextDay = navigationView.get('selectedDay');
      nextDay.setDate(nextDay.getDate()+1);

      navigationView.set({
        selectedDay: nextDay,
        selectedWeekDay: getWeekDayNumber(nextDay),
        selectedWeekDayName: WEEK_DAY_NAMES[getWeekDayNumber(nextDay)]
      });

      showFoodsFor(getWeekDayNumber(nextDay));
    }
  });

  foodView = new Ractive({
      el: 'food-container',
      template: '#page-template',
      data: {
        foodsByRestaurant : [],
        loadingFoods: false,
        formatPrices: formatPrices
      }
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

$(function() {
  initViewModels();

  showFoodsFor(selectedWeekDay);

  initWall();
});

function initWall() {
  wall = new freewall("#food-container");

    wall.reset({
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
  
  $.ajax({
        url: "2014_w18_unica.json"
    
    }).then(function(data) {   
       foodView.set('foodsByRestaurant', data.foodsByDay[weekday].foodsByRestaurant);
       foodView.set('loadingFoods', false);
       wall.refresh();
    });
}
