app.controller('PostEditController', function(Upload, $cookies, $http, $stateParams, $scope, $location){

    var self = this;
    var token = $cookies.get('token')
    console.log(token)


    var getEditRequest = $http({
        url: 'api/posts/' + $stateParams.id + '/?format=json',
        method: 'get'
    })

    getEditRequest.then(function(response){
        console.log(response)
        self.detail = response.data


    }, function(rejection){
        console.log(rejection.data)
    });

    self.editFunction = function(file) {
        if (token) {

            var fileUpload = Upload.upload({
                url: 'api/posts/update/'+ $stateParams.id + '/',
                method:'PUT',
                data: {
                title: self.title,
                content: self.content,
                image: file
                },
                headers: {
                    authorization: "JWT " + token

                 }
            })

            fileUpload.then(function(response) {
                console.log(response);
                $location.path('/blog_list')

            })

            fileUpload.catch(function(e){
                console.log('Update error', e)
                self.titleError = e.data.title
                self.contentError = e.data.content
                console.log(e.data.title)
                console.log(e.data.content)

                if (self.titleError == "This field is required.") {
                    self.titleErrorReq = "* Ovo polje je obavezno"
                }
                if (self.titleError == "Ensure this field has no more than 40 characters.") {
                    self.titleError40 = "* Naslov ne sme imati više od 40 slova uključujući i prazna mesta"
                }
                if (self.contentError == "This field is required.") {
                    self.contentErrorReq = "* Ovo polje je obavezno"
                }

            });


        } else {

        console.log("no token")

        }

    }

});