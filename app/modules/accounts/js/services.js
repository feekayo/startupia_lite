angular.module('ort.accounts.services',[])
    //factory for making toasts    
    .factory('Toast',['$mdToast',function($mdToast){
    
        var openToast = function(data){
            $mdToast.show($mdToast.simple().content(data));
        };
                
        return {
            makeToast : openToast
        }
    }])
    //factory for showing loading dialogs
    .factory('LoadingDialog',['$mdDialog',function($mdDialog){
        
        var showLoading = function(ev) {
            $mdDialog.show({
                templateUrl: 'modules/accounts/views/loading.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false
            }).then(function(answer){},function(){});        
        };
        
        return{
            show : showLoading
        }
    }])
    //factory for making dialogs
    .factory('dialog',['$mdDialog',function($mdDialog){
    
        var openDialog = function(title,content,okay){
            //console.log(''+title+' '+content+' '+okay+'');
            $mdDialog.show($mdDialog.alert({title:title,content:content,ok:okay}));    
        };
    
        return {
            openDialog : openDialog
        }
    }])
//factory for login,register and forgot password
    .factory('AccountsService',['$http','localStorageService','API_DOMAIN','URLService',function($http,localStorageService,API_DOMAIN,URLService){
         var login = function(email,password){
            var url = API_DOMAIN+URLService.getURLByTag('LOGIN');
            
            //shal1 password here
            password = /*shal1*/password;
            return $http({
                url: url,
                method: 'GET',
                params: {
                    email: email,
                    password: password
                }
            }).success(function(data,status,header,config){
                
            }).error(function(data,success,header,config){
            
            });
        }
        
        var signup = function(fullname,email,password){
            var url = API_DOMAIN+URLService.getURLByTag('SIGNUP');
            console.log(url);
            //shal1 password here
            password = /*shal1*/password;
            
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
                    fullname: fullname,
                    email: email,
                    password: password
                }
            }).success(function(data,status,header,config){
                
            }).error(function(data,success,header,config){
            
            });
        }
        
        var forgotpassword = function(email){
            var url = API_DOMAIN+URLService.getURLByTag('FORGOTPASSWORD');
            
            console.log(url);
            
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
                    email: email
                }
            })
        }
        
        var update = function(param,type){            
            var url = API_DOMAIN+URLService.getURLByTag('EDITPROFILE')+localStorageService.get('session_id');
            
            var user_data = localStorageService.get('user_data');
            console.log(url);
            
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
                    type: type,
                    param: param,
                    user_id: user_data.id
                }
            });            
        }
        
        var verify_password_change_token = function(email,token){
            var url = API_DOMAIN+URLService.getURLByTag('VERIFYPASSWORDTOKEN');
            
            console.log(url);
            
            return $http({
                url: url,
                method: 'GET',               
                params: {
                    email: email,
                    token: token
                }                
            });
        }
        
        var change_password = function(email,password,token){
            var url = API_DOMAIN+URLService.getURLByTag('CHANGEPASSWORD');
            
            console.log(url);
            
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
                    email: email,
                    password: password,
                    token: token
                }                
            });
        }
        
        return{
            login: login,
            signup: signup,
            forgotpassword: forgotpassword,
            update: update,
            verifyPasswordChangeToken: verify_password_change_token,
            changePassword: change_password
        }
    }]);
    