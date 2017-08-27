angular.module('umetnickiBlog').
    controller("ListController",['$http', '$cookies',

    // Kontroler za listu postova

    function($http, $cookies) {
        var self = this;

        var getRequest = $http({
            url: 'api/posts/?format=json',
            method: "get"

        })

        getRequest.then(function(response){
            self.Posts = response.data;
            console.log(response.data);

        });
    }

]);