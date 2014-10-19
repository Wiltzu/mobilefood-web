var ractive = new Ractive({
  el: 'container',
  template: '#foods-by-restaurant',
  data: {
    foodsByRestaurant : [
      {
        name: 'Assarin Ullakko',
        foods: [
          {
            name: 'Makaronilaatikko',
            diets: 'L G',
            prices: '2,60 / 4,90 / 5,90'
          },
          {
            name: 'Nakki ja Muusi',
            diets: 'L G',
            prices: '2,60 / 4,90 / 5,90'
          }
        ]
      },
      {
        name: 'Delica',
        foods: [
          {
            name: 'Makaronilaatikko',
            diets: 'L G',
            prices: '2,60 / 4,90 / 5,90'
          },
          {
            name: 'Nakki ja Muusi',
            diets: 'L G',
            prices: '2,60 / 4,90 / 5,90'
          }
        ]
      }
    ]
  }
});

$(function() {
    var wall = new freewall("#container");

    wall.reset({
        selector: '.item',
        cellH: 'auto',
        onResize: function() {
            wall.refresh();
        }
    });

    wall.fitWidth();
});
