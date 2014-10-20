var ractive, wall;

ractive = new Ractive({
  el: 'food-container',
  template: '#page-template',
  data: {
    foodsByRestaurant : [],
    loadingFoods: false,
    formatPrices: formatPrices
  }
});

$(function() {
    getFoods();

    wall = new freewall("#food-container");

    wall.reset({
        selector: '.item',
        cellH: 'auto',
        onResize: function() {
            wall.refresh();
        }
    });

    wall.fitWidth();
});

function formatPrices(prices) {
  return prices.join(' / ');
}

function getFoods() {
  ractive.set('loadingFoods', true);
  $.ajax({
        url: "2014_w18_unica.json",
    }).then(function(data) {
       ractive.set('foodsByRestaurant', data.foodsByDay[0].foodsByRestaurant);
       ractive.set('loadingFoods', false);
       wall.refresh();
    });
}
