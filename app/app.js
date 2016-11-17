var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

//Starts the application runs... initializations
myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider){

  // $locationProvider.html5Mode(true);

  $routeProvider
    .when('/directory',{
      templateUrl:'views/directory.html',
      controller: 'ninjaController'
    })
    .when('/home', {
      templateUrl:'views/home.html',
      controller: 'ninjaController'
    })
    .when('/contact',{
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact-success',{
      templateUrl: 'views/contact-success.html',
      controller: 'ContactController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);

myNinjaApp.directive('randomNinja',[function(){
  return {
    restrict: 'E',
    scope: {        //isolated scope
      ninjas: '=',
      title:'=',
    },
    // template: '<img ng-src="{{ninjas[random].thumb}}">',
    templateUrl: 'views/random.html',
    transclude: true,
    replace: true,                //replace the random-Ninja tag for the outter tag in the template
    controller: function($scope){
      $scope.random = Math.floor(Math.random()*4);
    }
  };

}]);
//Fired as the application runs
myNinjaApp.run(function(){

});


// [] are use to protect the $scope variable name
myNinjaApp.controller('ninjaController', ['$scope', '$http', function($scope,$http){

$scope.removeNinja =function(ninja){
  var removeNinja=$scope.ninjas.indexOf(ninja);
  $scope.ninjas.splice(removeNinja, 1);
};

$scope.addNinja =function(){
  $scope.ninjas.push({
    name: $scope.newninja.name,
    belt: $scope.newninja.belt,
    rate: parseInt($scope.newninja.rate),
    available: true,
  });
  $scope.newninja = {};
};

  $scope.removeAll =function(){
    $scope.ninjas = [];
  };

$http.get('data/ninjas.json').success(function(data){
  $scope.ninjas=data;
});

//   $scope.ninjas=[
//     {
//       name: "Raphael",
//       belt:"Red",
//       rate: 50,
//       available: true,
//       thumb: "content/img/raphael.png"
//     },
//     {
//       name: "Miguel Angel",
//       belt:"Orange",
//       rate: 30,
//       available: true,
//       thumb: "content/img/miguel.png"
//     },
//     {
//       name: "Donatello",
//       belt:"Purple",
//       rate: 10,
//       available: true,
//       thumb: "content/img/don.png"
//     },
//     {
//       name: "Leonardo",
//       belt:"Blue",
//       rate: 1000,
//       available: true,
//       thumb: "content/img/leo.png"
//     },
//
//   ];
// console.log(angular.toJson($scope.ninjas));


}]);

myNinjaApp.controller('ContactController', ['$scope','$location', function($scope,$location){
  $scope.sendMessage = function(){
    $location.path('/contact-success');
  }


}])
