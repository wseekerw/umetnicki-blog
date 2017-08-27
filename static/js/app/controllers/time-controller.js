var app = angular.module('umetnickiBlog');

app.controller('TimeController', ['$cookies','$interval','$http', function($cookies ,$interval, $http) {

    //Kontroler za home stranicu home

    var self = this;

    self.theTime = new Date().toLocaleTimeString();
    $interval(function () {
        self.theTime = new Date().toLocaleTimeString();
    }, 1000);
    if ($cookies.get("token")) {
        self.user = {
            username: $cookies.get("username")
        }
        self.welcomeMessage = 'Uspešno ste prijavljeni.'

    } else {
        self.user = {
            username: "Gost"
        }

    }
    self.staticSlika = static('img/red.jpg')




    var getRequest = $http({
        url: 'api/welcome_list/?format=json',
        method: "get"

    })

    getRequest.then(function(response){
        self.welcomeText = response.data;
        console.log(response.data);

    });


}]);