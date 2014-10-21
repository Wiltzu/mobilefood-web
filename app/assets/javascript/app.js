var weekdays = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai'];
var today = new Date();
var selectedDay = today;
var selectedWeekDay = getCurrentWeekDay(selectedDay);

function getCurrentWeekDay(date) {
  var dayStartingSunday = date.getDay();
  return dayStartingSunday < 6 ? dayStartingSunday - 1 : 0;
};

var ractive, wall;
initRactive();


$(function() {

    getFoods(selectedWeekDay);

    initWall();
});

function initRactive() {
  ractive = new Ractive({
      el: 'food-container',
      template: '#page-template',
      data: {
        foodsByRestaurant : [],
        loadingFoods: false,
        formatPrices: formatPrices
      }
    });
}

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

function formatPrices(prices) {
  return prices.join(' / ');
}

function getFoods(weekday) {
  ractive.set('loadingFoods', true);
  
  $.ajax({
        url: "2014_w18_unica.json"
    
    }).then(function(data) {   
       ractive.set('foodsByRestaurant', data.foodsByDay[weekday].foodsByRestaurant);
       ractive.set('loadingFoods', false);
       wall.refresh();
    });
}
