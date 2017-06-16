'use strict';


// Declare app level module which depends on filters, and services
angular.module('ort', [
    'ort.filters',
    'ort.services',
    'ort.directives',
    'ort.controllers',
    'ui.router',
    'ngMaterial',
    'LocalStorageModule',
    'accountsModule',
    'mainModule',
    'startupsModule',
    'angular-img-cropper',
    'textAngular'
    
]).config(function($httpProvider,localStorageServiceProvider){
    
    $httpProvider.defaults.useXDomain =false;
    $httpProvider.defaults.withCredentials = false;
    
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common.Accept ="applcation/json";
    $httpProvider.defaults.headers.common["Content-Type"] ="applcation/json";
     
    //local storage provider set prefix 
    localStorageServiceProvider.setPrefix('ort');
    
    //local storage set storage type
    localStorageServiceProvider.setStorageType('localStorage')
    //set fallback cookie
    .setStorageCookie('30','/')
    //set cookie domain
    localStorageServiceProvider.setStorageCookieDomain('');
});
