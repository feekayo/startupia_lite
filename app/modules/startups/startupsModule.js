angular.module('startupsModule',[
    'ort.startups.controllers',
    'ort.startups.services'
]).config(['$stateProvider','$locationProvider','$urlRouterProvider',function($stateProvider,$locationProvider,$urlRouterProvider){
    $stateProvider.state('startup',{
        url : '/:startup_token',
        templateUrl : 'modules/startups/views/home.html',
        controller : 'StartupHomeController'
    })
    .state('startup.dashboard',{
        url:'/dashboard',
        templateUrl: 'modules/startups/views/dashboard.html',
        controller: 'DashboardController'
    })  
    .state('startup.founders',{
        url:'/founders',
        templateUrl: 'modules/startups/views/founders.html',
        controller: 'FoundersController'
    })
    .state('startup.addfounders',{
        url:'/founders/add',
        templateUrl: 'modules/startups/views/addFounders.html',
        controller: 'FoundersController'
    })
    .state('startup.roles',{
        url:'/roles',
        templateUrl: 'modules/startups/views/roles.html',
        controller: 'RolesController'
    })
    .state('startup.business',{
        url:'/business',
        templateUrl: 'modules/startups/views/business.html',
        controller: 'BusinessController'
    })
    .state('startup.finance',{
        url: '/finance',
        templateUrl: 'modules/startups/views/finance.html',
        controller: 'FinanceController'
    })
    .state('startup.equity',{
        url: '/equity',
        templateUrl: 'modules/startups/views/equity.html',
        controller: 'EquityController'
    })
    .state('startup.products',{
        url: '/products',
        templateUrl: 'modules/startups/views/products.html',
        controller: 'ProductsController'
    })
    .state('startup.hr',{
        url: '/human_resources',
        templateUrl: 'modules/startups/views/hr.html',
        controller: 'HRController'
    })
    .state('startup.partners',{
        url: '/partnerships',
        templateUrl: 'modules/startups/views/partners.html',
        controller: 'PartnershipsController'
    })
    .state('startup.assets',{
        url: '/assets',
        templateUrl: 'modules/startups/views/assets.html',
        controller: 'AssetsController'
    })    
    //$locationProvider.html5Mode(true);
}]).config(['$mdThemingProvider',function($mdThemingProvider){    
    $mdThemingProvider.theme('lightTheme')
    .primaryPalette('blue',{
      'default': '500', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class    
    }).accentPalette('blue',{
        'default': '500', // by default use shade 400 from the pink palette for primary intentions
    }); 
    $mdThemingProvider.theme('darkTheme')
    .primaryPalette('grey',{
      'default': '800', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class    
    }).accentPalette('blue',{
        'default': '700', // by default use shade 400 from the pink palette for primary intentions
    });     
    $mdThemingProvider.theme('purpleTheme')
    .primaryPalette('purple',{
      'default': '50', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class    
    }).accentPalette('grey',{
        'default': '50', // by default use shade 400 from the pink palette for primary intentions
    }); 
}]);