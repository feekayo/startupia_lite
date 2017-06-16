angular.module('ort.startups.services',[])
.factory('StartupService',['$http','localStorageService','API_DOMAIN','URLService',function($http,localStorageService,API_DOMAIN,URLService){
    var fetch_setup_data = function(token){
        var url = API_DOMAIN+URLService.getURLByTag('FETCHSTARTUPSETUP');
        var user_data = localStorageService.get('user_data');
        
        return $http({
            url:url,
            method: 'GET',
            params: {
                token: token,
                email: user_data.email,
                user_id: user_data.id
            }
        }).success(function(data,status,header,config){
            
        }).error(function(data,status,header,config){
            
        });
    }

    var fetch_founders = function(startup_id){
        var url = API_DOMAIN+URLService.getURLByTag('FETCHSTARTUPFOUNDERS');
        
        return $http({
            url:url,
            method: 'GET',
            params: {
                startup_id: startup_id
            }
        }).success(function(data,status,header,config){
            
        }).error(function(data,status,header,config){
            
        });
    }
    
    var create_startup = function(name,get_url,type_id){
        var url = API_DOMAIN+URLService.getURLByTag('CREATESTARTUP')+localStorageService.get('session_id');
        var user_data = localStorageService.get('user_data');
        
        return $http({
            url: url,
            method: 'PUT',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function(obj){
                var str = [];
                for(var p in obj){
                    str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                }
                return str.join("&");
            },                
            data: {
                name: name,
                company_url: get_url,
                type_id: type_id,
                user_id: user_data.id,
                email: user_data.email
            }
        }).success(function(data,status,header,config){
            
        }).error(function(data,status,header,config){
         
        });
    }
    
    var create_founder = function(email,startup_id){
        var url = API_DOMAIN+URLService.getURLByTag('CREATEFOUNDER')+localStorageService.get('session_id');
        var user_data = localStorageService.get('user_data');
        
        return $http({
            url: url,
            method: 'PUT',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function(obj){
                var str = [];
                for(var p in obj){
                    str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                }
                return str.join("&");
            },                
            data: {
                email: email,
                user_id: user_data.id,
                startup_id: startup_id,
                boolean: false
            }
        }).success(function(data,status,header,config){
            
        }).error(function(data,status,header,config){
         
        });        
    }
    
    var update_startup = function(param,type,startup_id){
        var url = API_DOMAIN+URLService.getURLByTag('UPDATESTARTUP')+localStorageService.get('session_id');
        var user_data = localStorageService.get('user_data');
        return $http({
            url: url,
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function(obj){
                var str = [];
                for(var p in obj){
                    str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                }
                return str.join("&");
            },
            data: {
                user_id: user_data.id,
                startup_id: startup_id,
                type: type,
                param: param
            }
        }).success(function(data,status,header,config){
            
        }).error(function(data,status,header,config){
         
        });
    }
    
    var delete_founder = function(user_email,reason,startup_id){
        var url = API_DOMAIN+URLService.getURLByTag('DELETEFOUNDER')+localStorageService.get('session_id');
        var user_data = localStorageService.get('user_data');
        return $http({
            url: url,
            method: 'DELETE',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            transformRequest: function(obj){
                var str = [];
                for(var p in obj){
                    str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                }
                return str.join("&");
            },
            data: {
                user_id: user_data.id,
                startup_id: startup_id,
                user_email: user_email,
                reason: reason 
            }
        }).success(function(data,status,header,config){
            
        }).error(function(data,status,header,config){
         
        });        
    }
    
    return{
        fetch_setup_data: fetch_setup_data,
        fetch_founders: fetch_founders,
        create: create_startup,
        create_founder: create_founder,
        update_startup: update_startup,
        delete_founder: delete_founder
    }
}]);