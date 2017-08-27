var app = angular.module('umetnickiBlog');

app.controller('RegisterController', function($http, $scope){
    var self = this;
    var registerUrl = 'api/users/create/'
    self.user = {};

    self.doRegister = function(){

        var registerRequest = {
            url: registerUrl,
            method:'POST',
            data: {
                username: self.user.username,
                email: self.user.email,
                email2: self.user.email2,
                password: self.user.password,
                password2: self.user.password2
            },
            headers: {'Content-Type': 'application/json'}

        }

        $scope.userRegistered = false;

        var registerPromise = $http(registerRequest)

        registerPromise.then(function(response){
            self.statusText = response.statusText
            console.log(self.statusText)
            console.log(response)

            self.regUsername = response.data.username
            self.regEmail = response.data.email

            if (self.statusText == "Created") {
                self.registerMessage = "* Registracija uspešna"

                self.usernameError1 = "";
                self.emailErrorValid = "";
                self.emailError2Valid = "";
                self.emailError2Match = "";
                self.emailError2Reg = "";
                self.passwordErrorMatch = "";

            }


            $scope.$watch(function(){
            if (self.regUsername && self.regEmail) {
                $scope.userRegistered = true
            } else {
                $scope.userRegistered = false
            }

        })

        });

        registerPromise.catch(function(errResponse){
            //console.log(errResponse)
            self.usernameError = errResponse.data.username
            self.emailError = errResponse.data.email
            self.email2Error = errResponse.data.email2
            self.passwordError = errResponse.data.password2
            //console.log(self.usernameError,self.emailError,self.email2Error,self.passwordError)

            if (self.usernameError == "A user with that username already exists.") {
                self.usernameError1 = "* Korisnik sa tim imenom već postoji."

            }
            if (self.emailError == "Enter a valid email address.") {
                self.emailErrorValid = "* Unesite validnu email adresu."

            }
            if (self.email2Error == "Enter a valid email address.") {
               self.emailError2Valid = "* Unesite validnu email adresu."
               self.emailError2Match = "";
               self.emailError2Reg = "";
            }
            if (self.email2Error == "Emails must match!") {
               self.emailError2Match = "* Pravilno ponovite email adresu."
               self.emailError2Valid = "";
               self.emailError2Reg = "";
            }
             if (self.email2Error == "This email is allready registered.") {
               self.emailError2Reg = "* Ova email adresa vec je registrovana."
               self.emailError2Valid = "";
               self.emailError2Match = "";
            }
            if (self.passwordError == "Passwords must match!") {
               self.passwordErrorMatch = "* Pravilno ponovite lozinku."
            }


        });


    };




});
