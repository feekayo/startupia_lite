angular.module('mainModule',[
    'ort.main.controllers',
    'ort.main.services'
]).config(['$stateProvider','$locationProvider','$urlRouterProvider',function($stateProvider,$locationProvider,$urlRouterProvider){
    
    $stateProvider.state('home',{
        url : '/user',
        templateUrl : 'modules/main/views/home.html',
        controller : 'HomeController'
    })
    .state('home.registration',{
        url:'/register',
        templateUrl: 'modules/main/views/user_registration.html',
        controller: 'EditProfileController'
    })
    .state('home.startups',{
        url:'/startups',
        templateUrl: 'modules/main/views/personal_startups.html',
        controller: 'PersonalStartupsController'
    })    
    .state('home.profile',{
        url:'/profile',
        templateUrl: 'modules/main/views/profile.html',
        controller: 'ProfileController'
    })
    .state('home.cv',{
        url:'/cv',
        templateUrl: 'modules/main/views/cv.html',
        controller: 'CVController',
    })
    .state('home.personal_wallet',{
        url:'/wallet',
        templateUrl: 'modules/main/views/personal_wallet.html',
        controller: 'PersonalWalletController',
    })
    .state('home.personal_bids',{
        url:'/bids',
        templateUrl: 'modules/main/views/personal_bids.html',
        controller: 'PersonalBidsController',
    })
    .state('home.personal_equity',{
        url:'/equity',
        templateUrl: 'modules/main/views/personal_equity.html',
        controller: 'PersonalEquityController',
    })
    .state('home.consortiums',{
        url:'/consortiums',
        templateUrl: 'modules/main/views/personal_consortiums.html',
        controller: 'PersonalConsortiumsController',
    })
    .state('home.opportunities',{
        url:'/opportunities',
        templateUrl: 'modules/main/views/opportunities.html',
        controller: 'OpportunitiesController',
    })
    .state('home.scribbler',{
        url:'/scribbler',
        templateUrl: 'modules/main/views/scribbler.html',
        controller: 'ScribblerController'
    })
    .state('home.expert_consultations',{
        url:'/expert',
        templateUrl: 'modules/main/views/expert.html',
        controller: 'ExpertController'
    })
    .state('home.tasks',{
        url:'/tasks',
        templateUrl: 'modules/main/views/tasks.html',
        controller: 'TasksController'
    });
        
    

    $urlRouterProvider.otherwise('/login');
    //$locationProvider.html5Mode(true);
}]);