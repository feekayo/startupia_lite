angular.module('ort.main.services',[])
    .factory('CVService',['$http','localStorageService','API_DOMAIN','URLService',function($http,localStorageService,API_DOMAIN,URLService){
        
        var add_certificate = function(name,field,institiution,year,link){
            var url = API_DOMAIN+URLService.getURLByTag('ADDCERTIFICATE')+localStorageService.get('session_id');
            
            var user_data = localStorageService.get('user_data');
            //console.log(user_data);
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
                    user_id: user_data.id,
                    name: name,
                    field: field,
                    institiution: institiution,
                    year: year,
                    link: link
                }
            }).success(function(data,status,header,config){
                
            }).error(function(data,success,header,config){
            
            });
            
        }
        
        var add_job = function(company_name,position,job_description,start_year,end_year){
            var url = API_DOMAIN+URLService.getURLByTag('ADDJOB')+localStorageService.get('session_id');
            
            var user_data = localStorageService.get('user_data');
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
                    user_id: user_data.id,
                    company_name: company_name,
                    position: position,
                    job_description: job_description,
                    start_year: start_year,
                    end_year: end_year
                }
            }).success(function(data,status,header,config){
                
            }).error(function(data,success,header,config){
            
            });
            
        }
        
        var add_project = function(title,get_url,version,role,project_description,release_date){
            var url = API_DOMAIN+URLService.getURLByTag('ADDPROJECT')+localStorageService.get('session_id');
            
            var user_data = localStorageService.get('user_data');
            console.log(project_description);
            
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
                    user_id: user_data.id,
                    title: title,
                    url: get_url,
                    version: version,
                    role: role,
                    project_description: project_description,
                    release_date: release_date
                }
            }).success(function(data,status,header,config){
                
            }).error(function(data,success,header,config){
            
            });
        }
        
        var add_skill = function(name,get_url){
            var url = API_DOMAIN+URLService.getURLByTag('ADDSKILL')+localStorageService.get('session_id');
            
            var user_data = localStorageService.get('user_data');
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
                    user_id: user_data.id,
                    name: name,
                    url: get_url
                }
            })
            
        }
        
        var add_tool = function(tool,skill_id){
            var url = API_DOMAIN+URLService.getURLByTag('ADDTOOL')+localStorageService.get('session_id');
            
            var user_data = localStorageService.get('user_data');
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
                    user_id: user_data.id,
                    tool: tool,
                    skill_id: skill_id
                }
            })
            
        } 
        
        var add_interest = function(name,get_url){
            var url = API_DOMAIN+URLService.getURLByTag('ADDINTEREST')+localStorageService.get('session_id');
            
            var user_data = localStorageService.get('user_data');
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
                    user_id: user_data.id,
                    name: name,
                    url: get_url
                }
            })
            
        }
        
        var add_social = function(name,get_url){
            var url = API_DOMAIN+URLService.getURLByTag('ADDSOCIAL')+localStorageService.get('session_id');
            
            var user_data = localStorageService.get('user_data');
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
                    user_id: user_data.id,
                    platform: name,
                    url: get_url
                }
            })
            
        }        
        
        var get_skills = function(){
            var url = API_DOMAIN+URLService.getURLByTag('FETCHSKILLS');
            
            var user_data = localStorageService.get('user_data');
            console.log(url);
            
            return $http({
                url: url,
                method: 'GET',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                params: {
                    user_id: user_data.id,
                }
            });            
            
        }
        
        var get_cv = function(){
            var url = API_DOMAIN+URLService.getURLByTag('FETCHCV');
            
            var user_data = localStorageService.get('user_data');
            console.log(url);
            
            return $http({
                url: url,
                method: 'GET',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                params: {
                    user_id: user_data.id,
                }
            });            
        }
        
        var delete_certificate = function(cert_id){
            var url = API_DOMAIN+URLService.getURLByTag('DELETECERTIFICATE')+localStorageService.get('session_id');
            
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
                    cert_id: cert_id
                }
            });
        }
        
        var delete_job = function(job_id){
            var url = API_DOMAIN+URLService.getURLByTag('DELETEJOB')+localStorageService.get('session_id');
            
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
                    job_id: job_id
                }
            });                       
            
        }
        
        var delete_project = function(project_id){
            var url = API_DOMAIN+URLService.getURLByTag('DELETEPROJECT')+localStorageService.get('session_id');
            
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
                    project_id: project_id
                }
            });                       
            
        }
        
        var delete_skill = function(skill_id){
            var url = API_DOMAIN+URLService.getURLByTag('DELETESKILL')+localStorageService.get('session_id');
            
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
                    skill_id: skill_id
                }
            });                       
            
        }
        
        var delete_tool = function(tool_id){
            var url = API_DOMAIN+URLService.getURLByTag('DELETETOOL')+localStorageService.get('session_id');
            
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
                    tool_id: tool_id
                }
            });                       
            
        } 
        
        var delete_interest = function(interest_id){
            var url = API_DOMAIN+URLService.getURLByTag('DELETEINTEREST')+localStorageService.get('session_id');
            
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
                    interest_id: interest_id
                }
            });                          
        }         
        
        var delete_essay = function(){
            var url = API_DOMAIN+URLService.getURLByTag('DELETEESSAY')+localStorageService.get('session_id');
            
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
                    user_id: user_data.id
                }
            });                       
            
        } 
        
        var delete_social = function(social_id){
            var url = API_DOMAIN+URLService.getURLByTag('DELETESOCIAL')+localStorageService.get('session_id');
            
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
                    social_id: social_id
                }
            });                       
            
        }         
        
        return{
            add_certificate: add_certificate,
            add_job: add_job,
            add_project: add_project,
            add_skill: add_skill,
            add_tool: add_tool,
            add_interest: add_interest,
            add_social: add_social,
            get_skills: get_skills,
            get_cv: get_cv,
            delete_certificate: delete_certificate,
            delete_job: delete_job,
            delete_project: delete_project,
            delete_skill: delete_skill,
            delete_tool: delete_tool,
            delete_interest: delete_interest,
            delete_essay: delete_essay,
            delete_social: delete_social
        }
    }])
    .factory('UserStartupsService',['$http','localStorageService','API_DOMAIN','URLService',function($http,localStorageService,API_DOMAIN,URLService)       {
        
        
        var add_startup = function(name,type_id){
            var url = API_DOMAIN+URLService.getURLByTag('ADDSTARTUP')+localStorageService.get('session_id');
            
            var user_data = localStorageService.get('user_data');
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
                    user_id: user_data.id,
                    type_id: type_id,
                    name: name,
                    email: user_data.email
                }
            })
            
        }             
        
       return{
           add_startup: add_startup
       } 
    }])    
    .factory('BusinessCategories',[function(){
        return{
            categories: [{
                id: 1,
                name: "Tech",
            },{
                id: 2,
                name: "Fashion",
            },{
                id: 3,
                name: "Manufacturing",
            },{
                id: 4,
                name: "Business Services",
            }]
        }
    }]);;