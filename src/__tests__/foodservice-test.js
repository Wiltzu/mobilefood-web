jest.dontMock('../javascript/foodservice.js');

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
        success: jasmine.any(Function)
      });
    });
  });

  describe('#getFoodsFor()', function(){
    it('should do something', function(){
      var foodService = new FoodService({REST_URL: "http://localhost:4730/mobilefoodrest/"});
      
      function someCallback() {}
      foodService.getFoodsFor(2014, 12, 5, someCallback);
    });
  });
});

