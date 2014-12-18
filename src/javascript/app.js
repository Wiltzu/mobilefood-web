var $ = require('jQuery'); window.jQuery = $;
var bootstrap = require('bootstrap');
var CONFIG = require('../config/config.json');
var FoodService = require('./foodservice.js');
var MainViewModel = require('./mainviewmodel.js');

$(function() {
  foodService = new FoodService(CONFIG);
  var mainViewModel = new MainViewModel(foodService);
});

