angular.module('accountsModule',[
    'ort.accounts.controllers',
    'ort.accounts.services'
]).config(['$stateProvider','$locationProvider','$urlRouterProvider',function($stateProvider,$locationProvider,$urlRouterProvider){
    
    $stateProvider
        .state('login',{
            url : '/login',
            templateUrl : 'modules/accounts/views/login.html',
            controller : 'LoginController'
        })
    
        .state('changepassword',{
            url : '/password_change',
            templateUrl : 'modules/accounts/views/changepassword.html',
            controller : 'ChangePasswordController'
        })    
    
        .state('signup',{
            url : '/signup',
            templateUrl : 'modules/accounts/views/signup.html',
            controller : 'SignUpController'
        })
    
        .state('profile',{
            url : '/profile',
            templateUrl : 'modules/accounts/views/profile.html',
            controller : 'ProfileController'
        })
        .state('profile.tasks',{
            url : '/tasks',
            templateUrl : 'modules/accounts/views/tasks.html',
            controller : 'ProfileController'
        })
    
        .state('profile.startups',{
            url : '/startups',
            templateUrl : 'modules/accounts/views/startups.html',
            controller : 'ProfileController'
        })
    
        .state('profile.roles',{
            url : '/roles',
            templateUrl : 'modules/accounts/views/roles.html',
            controller : 'ProfileController'
        })
    
        .state('about',{
            url : '/about',
            templateUrl : 'modules/accounts/views/about.html',
            controller : 'AboutController'
        });
    
    //$locationProvider.html5Mode(true);
}]).config(['$mdThemingProvider',function($mdThemingProvider){

    $mdThemingProvider.theme('default')
    .primaryPalette('purple', {
      'default': '900', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    }).accentPalette('pink');   
}]);