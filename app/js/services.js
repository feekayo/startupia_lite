'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('ort.services', [])
    .value('version', '0.1')

    //API DOMAIN 
    .value('API_DOMAIN','http://localhost:3000')

    //SERVICE URLS
    .factory('URLService',[function(){

        return{
            URLS: [{
                id: 1,
                tag: 'LOGIN',
                url: '/user/login'
            },{
                id: 2,
                tag: 'SIGNUP',
                url: '/user/register'
            },{
                id: 3,
                tag: 'FORGOTPASSWORD',
                url: '/user/forgot_password'
            },{
                id: 4,
                tag: 'EDITPROFILE',
                url: '/user/edit/'
            },{
                id: 5,
                tag: 'CREATESTARTUP',
                url: '/create/startup/'
            },{
                id: 6,
                tag: 'FETCHSTARTUPSETUP',
                url: '/read/startup_setup'
            },{
                id: 7,
                tag: 'FETCHSTARTUPFOUNDERS',
                url: '/read/startup_founders'
            },{
                id: 8,
                tag: 'VERIFYPASSWORDTOKEN',
                url: '/user/check_passwordchange_token'
            },{
                id: 9,
                tag: 'CHANGEPASSWORD',
                url: '/user/change_password'
            },{
                id: 10,
                tag: 'CREATEFOUNDER',
                url: '/create/founder/'
            },{
                id: 11,
                tag: 'UPDATESTARTUP',
                url: '/update/startup/'
            },{
                id: 12,
                tag: 'DELETEFOUNDER',
                url: '/delete/founders/'
            }],
            
            getURLByTag: function(tag){
                for(var i in this.URLS){
                    if(this.URLS[i].tag==tag){
                        return this.URLS[i].url;
                    }
                }
            }
        }
    }]);