angular.module('ort.accounts.controllers',[])
    .controller('LoadingDialogController',['$scope','localStorageService',function($scope,localStorageService){
        
        $scope.message = localStorageService.get('loadingDialogMsg');
    
        //delete
        localStorageService.remove('loadingDialogMsg');    
    }])    
    .controller('LoginController',['$scope','$state','$mdDialog','Toast','LoadingDialog','AccountsService','localStorageService',function($scope,$state,$mdDialog,Toast,LoadingDialog,AccountsService,localStorageService){
      // display forgot password on click
        $scope.showForgotDialog = function(ev) {
            $mdDialog.show({
                templateUrl: 'modules/accounts/views/forgotpassword.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            }).then(function(answer) {
                
            }, function() {
                
            });
          }; 
        
        $scope.loginData = {};//initialize user login data
        $scope.login = function(){
            
            var email = $scope.loginData.email;//initialize email
            var password = $scope.loginData.password;//initialize password and sha1 it
            
            localStorageService.set('loadingDialogMsg','Attempting Login');//set dialog message
            LoadingDialog.show();
            
            AccountsService.login(email,password)//carry out login action
            .then(function(response){
                $mdDialog.hide();
                if(response.data.success==1){
                    localStorageService.set('user_data',response.data.data);
                    localStorageService.set('session_id',response.data.session_id);
                    $state.go('profile.tasks',{})
                    Toast.makeToast(response.data.log);
                }else{
                    Toast.makeToast(response.data.log);
                }
            },function(error){
                $mdDialog.hide();//hide dialog
                localStorageService.remove('loadingDialogMsg');//delete message in loading dialog
                Toast.makeToast("Error in connection");
            })
        }
        
    }])
    .controller('ChangePasswordController',['$scope','$state','AccountsService','localStorageService','Toast',function($scope,$state,AccountsService,localStorageService,Toast){
        
        $scope.user_email = localStorageService.get('UpdateEmail');
        $scope.goto = function(state){
            $state.go(state,{});    
        }        
        
        $scope.reSendEmail = function(){
            var email = $scope.user_email;//initialize variable
            $scope.processing = true;//show processing animation
            AccountsService.forgotpassword(email)//carry out forgot password
            .then(function(response){                
                $scope.processing = false;//hide processing animation
                Toast.makeToast(response.data.log);
            },function(error){
                $scope.processing = false;//hide processing animation
                Toast.makeToast("Error in connection");
            })
            
            
        }
        
        $scope.verifyToken = function(){//for verifying token
            console.log("Debug");//check of 
            $scope.processingToken = true;//show loading dialog
            
            var email = $scope.user_email;//the email the user had previously inputted
            var token = $scope.passwordchange.token;//the token inputted into the form
            
            AccountsService.verifyPasswordChangeToken(email,token)//connect to service carrying out the action
            .then(function(response){
                if(response.data.success==1){
                    Toast.makeToast(response.data.log);//show message from backend to user
                    $scope.processingToken = false;//hide processing animation
                    $scope.verifiedToken = true;//show update password form
                }else{
                    Toast.makeToast(response.data.log);//show backend message to user
                    $scope.processingToken = false;//hide processing animation
                }
            },function(error){
                $scope.processingToken = false;
                Toast.makeToast("Error in connection");
            })
            
        }
        
        $scope.changePassword = function(){//for updating password
            console.log("Debug");
            $scope.changingPassword = true;// show loading animation
            
            var password = $scope.passwordchange.password
            var cpassword = $scope.passwordchange.cpassword
            
            if(password != cpassword){
                Toast.makeToast("Passwords don't match");
            }else{
                AccountsService.changePassword($scope.user_email,password,$scope.passwordchange.token)
                .then(function(response){
                    if(response.data.success==1){
                        Toast.makeToast(response.data.log);//show message from backend to user
                        $scope.changingPassword = false;//hide processing animation
                        $state.go('login',{});//go to login page
                    }else{
                        Toast.makeToast(response.data.log);//show backend message to user
                        $scope.changingPassword = false;//hide processing animation
                    }
                },function(error){
                    $scope.changingPassword = false;
                    Toast.makeToast("Error in connection");
                }); 
            }
            
        }
        
    }])
    .controller('SignUpController',['$scope','$mdDialog','Toast','LoadingDialog','AccountsService','localStorageService',function($scope,$mdDialog,Toast,LoadingDialog,AccountsService,localStorageService){
        console.log("von Neumann 2");
        $scope.signupData = {};//initialize login data array
        $scope.signup = function(){
            var email = $scope.signupData.email;//initialize variables
            var fullname = $scope.signupData.fullname;
            var password = $scope.signupData.password;
            
            localStorageService.set('loadingDialogMsg','Attempting to Register');//set dialog message
            LoadingDialog.show();
            
            AccountsService.signup(fullname,email,password)//carry out login action
            .then(function(response){
                
                $mdDialog.cancel();
                
                if(response.data.success==1){
                    Toast.makeToast(response.data.log);
                }else{
                    Toast.makeToast(response.data.log);
                }
            }, function(error){              
                $mdDialog.cancel();//cancel dialog
                
                localStorageService.remove('loadingDialogMsg');//delete local storage dialog  
                Toast.makeToast("Error in connection");
            })
        }    
    }])
    .controller('ForgotPasswordController',['$scope','AccountsService','Toast','$mdDialog','$state','localStorageService',function($scope,AccountsService,Toast,$mdDialog,$state,localStorageService){
        $scope.showButton = true;//show send email button
        $scope.sendEmail = function(){
            console.log("Debug");
            var email = $scope.userEmail;//initialize variable
            $scope.processing = true;//show processing animation
            AccountsService.forgotpassword(email)//carry out forgot password
            .then(function(response){
                if(response.data.success==1){
                    $mdDialog.hide();
                    localStorageService.set('UpdateEmail',email);
                    $state.go('changepassword',{});
                }
                $scope.processing = false;//hide processing animation
                Toast.makeToast(response.data.log);
            },function(error){
                $scope.processing = false;//hide processing animation
                Toast.makeToast("Error in connection");
            })
            
            
        }

    }])
    .controller('ProfileController',['$scope','$state','$mdDialog','localStorageService','AccountsService','LoadingDialog','Toast','BusinessCategories','StartupService',function($scope,$state,$mdDialog,localStorageService,AccountsService,LoadingDialog,Toast,BusinessCategories,StartupService){
        
        
        $scope.categories = BusinessCategories.categories;
        //for displaying dialog to add new startup
        $scope.showAdd = function(ev){
            $mdDialog.show({
                templateUrl: "modules/accounts/views/addStartupDialog.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            })
            .then(function(){},function(){});
        }
        
        //for displaying dialog to add new startup
        $scope.showUpdateBioDialog = function(ev){
            $mdDialog.show({
                templateUrl: "modules/accounts/views/updateBio.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            })
            .then(function(){},function(){});
        }        
        
        $scope.session_data = localStorageService.get('user_data');
        var user_data = $scope.session_data;
        console.log($scope.session_data);
        $scope.closeDialog = function(){
            $mdDialog.hide();
        }
        
        $scope.goto = function(state){
            $state.go(state,{})
        }
        
        /**For Updating Bio*/
        
        $scope.$watchCollection('session_data',function(newValue,oldValue){
           if(newValue.bio != oldValue.bio){
               $scope.showEditBioButton = true;
           }else if(newValue.dp != oldValue.dp){
               $scope.showEditDpButton = true;
           } 
        });
        
        $scope.editBio = function(){
            $scope.updatingBio = true;
            var bio = $scope.session_data.bio;//initialize variable
            //$scope.showUpdateBio = false;//hide edit widgets
            
            //$scope.bioUpdate = {};//initilaize bio update message
            AccountsService.update(bio,'Bio')
            .then(function(response){
                $scope.updatingBio = false;
                Toast.makeToast(response.data.log);//notify user of error
                if(response.data.success==1){//if successful
                    $scope.showEditBioButton = false;
                    user_data.bio = bio;//update user data variable
                    localStorageService.set('user_data',user_data);
                }
            },function(error){
                $scope.updatingBio = true;
                console.log(error);
                Toast.makeToast("Error in connection");
            });
        }
        
        $scope.editDP = function(){
            $scope.updatingDp = true;
            var dp = $scope.session_data.dp;//initialize variable
            //$scope.showUpdateBio = false;//hide edit widgets
            
            //$scope.bioUpdate = {};//initilaize bio update message
            AccountsService.update(dp,'Dp')
            .then(function(response){
                $scope.updatingDp = false;
                Toast.makeToast(response.data.log);//notify user of error
                if(response.data.success==1){//if successful
                    $scope.showEditDpButton = false;
                    user_data.dp = dp;//update user data variable
                    localStorageService.set('user_data',user_data);
                }
            },function(error){
                $scope.updatingDp = false;
                console.log(error);
                Toast.makeToast("Error in connection");
            });
        }        
        
        /*end for updating bio*/
        
        /*For adding startups*/
            $scope.addStartUp = function(){
                $scope.showLoading = true;
                
                var name = $scope.business.name,
                    get_url = $scope.business.url,
                    type_id = $scope.business.category_id;
                StartupService.create(name,get_url,type_id)
                .then(function(response){
                    if(response.data.success==1){//if startup is successfully created
                        console.log(response.data);
                        $mdDialog.hide();//hide loading dialog
                        Toast.makeToast(response.data.log);
                        $state.go('startup.dashboard',{startup_token:response.data.token});//goto new startup dashboard
                    }else{
                        $scope.showLoading = false;//stop showing loading dialog 
                        Toast.makeToast(response.data.log);
                    }
                },function(error){
                    console.log(error);
                    $scope.showLoading = false;//hide loading dialog
                    Toast.makeToast("Error in connection")
                })
            }
        /*End adding startups*/
        
    }])
    .controller('EditProfileController',['$scope','Toast','localStorageService','$mdDialog','AccountsService',function($scope,Toast,localStorageService,$mdDialog,AccountsService){
        $scope.session_data = localStorageService.get('user_data');//initialize user session data
        var user_data = $scope.session_data;//initialize user session data
        
        $scope.closeDialog = function(){//for closing the dialog
            $mdDialog.hide();// carries out the action
        }
        
        $scope.$watchCollection('session_data',function(newValue,oldValue){
           if(newValue.bio != oldValue.bio){
               $scope.showEditBioButton = true;
           } 
        });
        
        $scope.editBio = function(){
            $scope.updateBioLoading = true;//start showing loading message
            var bio = $scope.session_data.bio;//initialize variable
            $scope.showUpdateBio = false;//hide edit widgets
            
            $scope.bioUpdate = {};//initilaize bio update message
            AccountsService.update(bio,'Bio')
            .then(function(response){
                $scope.updateBioLoading = false;//unset loading message
                if(response.data.success==1){
                    user_data.bio = bio;//update user data variable
                    localStorageService.set('user_data',user_data);//update session data
                    $scope.bioUpdate.successMessage = response.data.log;//notify user of error
                                    
                }else{
                    $scope.bioUpdate.errorMessage = response.data.log;//notify user of error
                }
            },function(error){
                console.log(error);
                $mdDialog.hide();//hide loading dialog
                Toast.makeToast("Error in connection");
            });
        }        
    }])
    .controller('AboutController',['$scope',function($scope){
       
    }]);