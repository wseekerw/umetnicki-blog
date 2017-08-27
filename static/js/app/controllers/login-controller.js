var app = angular.module('umetnickiBlog');

app.controller("LoginController", function($cookies, $http, $location, $stateParams){

    // Kontroler za Logovanje
    var self = this;
    var loginUrl = 'api/users/login/'
    self.user = {
    }

    self.doLogin = function(){


        var requestConfig = {
            method: "POST",
            url: loginUrl,
            data: {
                username: self.user.username,
                password: self.user.password
            },
            headers: {}
        }
        var requestAction = $http(requestConfig)


        requestAction.then(function(response){
            console.log(response)
            $cookies.put("token", response.data.token)
            $cookies.put("username", response.data.username)
            $location.path("/")
            console.log($cookies.get('username'), $cookies.get('token'))

        })

        requestAction.catch(function(errResponse){
            //console.log(errResponse.data.non_field_errors)
            self.loginError = errResponse.data.non_field_errors

            if (self.loginError == "Unable to login with provided credentials!") {
                self.loginError1 = "* Prijava neuspešna. Netačni kredencijali!"
            }

        })
    }

})