angular.module('ort.startups.controllers',[])
    .controller('StartupHomeController',['$scope','$state','$mdDialog','Toast','$stateParams','StartupService','BusinessCategories','localStorageService',function($scope,$state,$mdDialog,Toast,$stateParams,StartupService,BusinessCategories,localStorageService){
 
        $scope.goto = function(state){
            $state.go(state,{});
        }
        
        function fetch_startup(){//for fetching setup data
            var token = $stateParams.startup_token;//use token reference from url
            StartupService.fetch_setup_data(token)
            .then(function(response){
                console.log(response.data);
                if(response.data.success==1){//if data is fetched
                    $scope.startup_data = response.data.data;//initialize startup data
                    $scope.startup_admin = response.data.admin;//set super admin boolean;
                    $scope.startup_type = BusinessCategories.categories[$scope.startup_data.type_id-1];
                    $scope.categories = BusinessCategories.categories;
                    
                    $scope.$watchCollection('startup_data',function(newValue,oldValue){//watch collection for updates
                       if(newValue.name != oldValue.name){
                           $scope.showEditCNameButton = true;
                       }else if(newValue.logo != oldValue.logo){
                           $scope.showEditCLogoButton = true;
                       }else if(newValue.url != oldValue.url){
                           $scope.showEditCUrlButton = true;
                       }else if(newValue.type_id != oldValue.type_id){
                           $scope.startup_type = BusinessCategories.categories[$scope.startup_data.type_id-1];
                           $scope.showEditCategoryButton = true;
                       }
                    });   
                    
                }else{//if no data is fetched
                    $scope.errorMsg = response.data.log;//display data to user
                }
            },function(error){//if a backend error occurs
                $scope.errorMsg = "Error in connection";
            });
        } 
        
        fetch_startup();//fetch startup        
        
        $scope.refresh = function(){//for refreshing page
            $scope.startup_data = false;
            $scope.errorMsg = false;
            fetch_startup();
        }
        
        $scope.editCName = function(){
            $scope.updatingCName = true;
            var param = $scope.startup_data.name,
                type = 'Name',
                startup_id = $scope.startup_data.id;
            
            StartupService.update_startup(param,type,startup_id)
            .then(function(response){
                $scope.updatingCName = false;
                Toast.makeToast(response.data.log);
                if(response.data.success==1){//if successfully updated
                    $scope.showEditCNameButton = false;
                }
            },function(error){
                $scope.updatingCName = false;
                Toast.makeToast('Error in connection');
            });
        }
        
        $scope.editCLogo = function(){
            $scope.updatingCLogo = true;
            var param = $scope.startup_data.logo,
                type = 'Logo',
                startup_id = $scope.startup_data.id;
            
            StartupService.update_startup(param,type,startup_id)
            .then(function(response){
                $scope.updatingCLogo = false;
                Toast.makeToast(response.data.log);
                if(response.data.success==1){//if successfully updated
                    $scope.showEditCLogoButton = false;
                }
            },function(error){
                $scope.updatingCLogo = false;
                Toast.makeToast('Error in connection');
            });            
        }
        
        $scope.editCUrl = function(){
            $scope.updatingCUrl = true;
            var param = $scope.startup_data.url,
                type = 'Url',
                startup_id = $scope.startup_data.id;
            
            StartupService.update_startup(param,type,startup_id)
            .then(function(response){
                $scope.updatingCUrl = false;
                Toast.makeToast(response.data.log);
                if(response.data.success==1){//if successfully updated
                    $scope.showEditCUrlButton = false;
                }
            },function(error){
                $scope.updatingCUrl = false;
                Toast.makeToast('Error in connection');
            });              
        }
        
        $scope.editCategory = function(){
            $scope.updatingCategory = true;
            var param = $scope.startup_data.type_id,
                type = 'Category',
                startup_id = $scope.startup_data.id;
            
            StartupService.update_startup(param,type,startup_id)
            .then(function(response){
                $scope.updatingCategory = false;
                Toast.makeToast(response.data.log);
                if(response.data.success==1){//if successfully updated
                    $scope.showEditCategoryButton = false;
                }
            },function(error){
                $scope.updatingCategory = false;
                Toast.makeToast('Error in connection');
            });             
        }
    }])
    .controller('DashboardController',['$scope','$state','$mdDialog','Toast','$stateParams','StartupService','BusinessCategories','localStorageService',function($scope,$state,$mdDialog,Toast,$stateParams,StartupService,BusinessCategories,localStorageService){
       
    }])
    .controller('FoundersController',['$scope','$state','$mdDialog','StartupService','$stateParams','localStorageService','Toast',function($scope,$state,$mdDialog,StartupService,$stateParams,localStorageService,Toast){
        
        var user_data = localStorageService.get('user_data');
        $scope.user_id = user_data.id;
        
        $scope.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
        
        $scope.goto = function(state){
            $state.go(state,{})
        }
        
        //delete dialogs
        $scope.showDeleteFounder = function(ev,user_email,startup_id){
            
            var specialData = {};//declare a special data variable
            specialData.user_email = user_email;
            specialData.startup_id = startup_id;
            localStorageService.set('DeleteFounderData',specialData);//pass data into global storage space
            
            $mdDialog.show({
                templateUrl: 'modules/startups/views/deletefounder.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            }).then(function(answer) {
                fetch_founders(startup_id);
            }, function() {
                
            });
        }
        
        function fetch_startup(){//for fetching setup data
            var token = $stateParams.startup_token;//use token reference from url
            StartupService.fetch_setup_data(token)
            .then(function(response){
                if(response.data.success==1){//if data is fetched        
                    $scope.startup_admin = response.data.admin;//set super admin boolean;
                    $scope.startup_data = response.data.data;//initialize startup data
                    fetch_founders($scope.startup_data.id);
                    console.log($scope.startup_data);
                }else{//if no data is fetched
                    $scope.errorMsg = response.data.log;//display data to user
                }
            },function(error){//if a backend error occurs
                $scope.errorMsg = "Error in connection";
            });
        } 

        
        fetch_startup();//fetch startup
        
        function fetch_founders(startup_id){//for fetching the startups founders
            StartupService.fetch_founders(startup_id)
            .then(function(response){
                if(response.data.success==1){//if data is fetched
                    $scope.startup_founders = toObject(response.data.data);//initialize startup data
                    
                    console.log($scope.startup_founders);
                }else{//if no data is fetched
                    $scope.errorMsg = response.data.log;//display data to user
                }                
            },function(error){
                $scope.errorMsg = "Error in connection"
            })
        
        }
        function toObject(arr){
            var rv = {};
            for (var i=0;i<arr.length;++i){
                rv[i] = arr[i];
            }
            return rv;
        }
        
        $scope.addFounder = function(){//for adding founders
            
            $scope.addingFounder = true;
            var email = $scope.cofounderEmail,
                startup_id = $scope.startup_data.id;
            
            StartupService.create_founder(email,startup_id)
            .then(function(response){
                  $scope.addingFounder = false;
                
                Toast.makeToast(response.data.log);   
            },function(error){
                $scope.addingFounder = false;
                Toast.makeToast("Error in connection");
            });
        }
    }])
    .controller('DeleteFounderController',['$state','$scope','$mdDialog','localStorageService','Toast','StartupService',function($state,$scope,$mdDialog,localStorageService,Toast,StartupService){
        $scope.founderData = localStorageService.get('DeleteFounderData');
        
        localStorageService.remove('DeleteFounderData');//remove
        
        $scope.delete = function(){
            $scope.removing = true;
            var reason = $scope.reason;
            var startup_id = $scope.founderData.startup_id;
            var user_email = $scope.founderData.user_email;
            
            StartupService.delete_founder(user_email,reason,startup_id)
            .then(function(response){
                $scope.removing = false;
                if(response.data.success==1){
                    $mdDialog.hide();
                }
                Toast.makeToast(response.data.log);   
            },function(error){
                $scope.addingFounder = false;
                Toast.makeToast("Error in connection");
            });
        }
    }])
    .controller('RolesController',[function(){
        
    }])
    .controller('FinanceController',[function(){
        
    }])
    .controller('ProductsController',[function(){
        
    }])
    .controller('EquityController',[function(){
        
    }]);