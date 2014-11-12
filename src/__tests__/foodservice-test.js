jest.dontMock('../javascript/foodservice.js');

 // Storage Mock
function mockLocalStorage() {
  var storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return storage[key];
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}

describe('FoodService', function(){
  var $, FoodService;

  beforeEach(function() {
    $ = require("jQuery");
    FoodService = require("../javascript/foodservice");
  });

  describe('#getRestaurantInfo()', function(){
    it('should do something', function(){
      
      var foodService = new FoodService({REST_URL: "http://localhost:4730/mobilefoodrest/"});
      
      function someCallback() {};
      foodService.getRestaurantInfo(1, someCallback);

      expect($.ajax).toBeCalledWith({
        dataType: "jsonp",
        url: 'http://localhost:4730/mobilefoodrest/?restaurant=unica&year=2014&week=45',
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });
  });

  describe('#getFoodsFor()', function(){
    it('should call ajax with correct parameters', function(){
      var foodService = new FoodService({REST_URL: "http://localhost:4730/mobilefoodrest/"});
      
      function someCallback() {}
      foodService.getFoodsFor(2014, 46, 5, someCallback);

      expect($.ajax).toBeCalledWith({
        dataType: "jsonp",
        url: 'http://localhost:4730/mobilefoodrest/?restaurant=unica&year=2014&week=46',
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });
  });
});

