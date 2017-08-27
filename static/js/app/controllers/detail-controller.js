app.controller('DetailController', function($location, $window, $cookies, $scope, $http, $stateParams){

    // Kontroler za detalje postova
    var self = this;
    var token = $cookies.get('token')



    if (token) {
        self.username = $cookies.get('username')
        // Varijabla za username prilikom komentarisanja
    } else {
        console.log('No username')
    }

    var detailFunction = function(){

        // funkcija za detail stranicu sa delete funkcijom

        var requestDetail = $http({
        url: 'api/posts/' + $stateParams.id + '/?format=json',
        method: 'get'
        })

        requestDetail.then(function(response){
            self.detail = response.data
            console.log(self.detail)



            var loggedInUser = $cookies.get('username')
            var postUser = self.detail.user.username

            console.log(loggedInUser)
            console.log(postUser)
            console.log(token)

        // Watch funkcija za Delete dugme
            $scope.$watch(function(){
                if (loggedInUser != postUser) {
                    $scope.userDeleteLoggedIn = true
                } else {
                    $scope.userDeleteLoggedIn = false
                }

            })

            self.deletePost = function(){

            // Zaboravio sam zasto je deletePost funkcija stavljena unutar detail callback

                if (token) {


                    var deleteUrl = 'api/posts/' + $stateParams.id + '/'

                    var requestDelete = {
                        method: 'DELETE',
                        url: deleteUrl,
                        headers: {
                            authorization: "JWT " + token
                        }
                    }

                    var deletePromise = $http(requestDelete)

                    deletePromise.then(function(response){
                        console.log(response.data);
                        $location.path('/blog_list')

                    }, function(rejection){
                        console.log(rejection.data);
                    })

                } else {
                    console.log('No token')
                }

            }


            });

        requestDetail.catch(function(e){
            console.log('Error', e)


        });

    };

    detailFunction();


    self.addCommentReply = function(reply, parentComment){

        // funkcija za dodavanje komentara na komentare

        console.log(reply.content)
        console.log(parentComment.id)
        var commentReplyCreateUrl = 'api/comment_replies/create/'

        if (token) {
            var commentReplyCreate = {
                method: "POST",
                url: commentReplyCreateUrl,
                data: {
                    content: reply.content,
                    comment: parentComment.id,
                },
                headers: {
                    authorization: "JWT " + token

                }

            }

        var commentReplyCreatePromise = $http(commentReplyCreate)

        commentReplyCreatePromise.then(function(response){
            console.log(response)
            $window.location.reload();
        }, function(rejection){
            console.log(rejection)

        })

        } else {
            console.log("No token")
        }

    };


    self.postComment = function() {

    // Funkcija za postovanje komentara

        var commentCreateUrl = 'api/comments/create/'
        var postId = $stateParams.id

        if (token) {
            var requestPostComment = {
                method: "POST",
                url: commentCreateUrl,
                data: {
                    content: self.content,
                    post: postId,
                },
                headers: {
                    authorization: "JWT " + token
                }
            }

            var postCommentPromise = $http(requestPostComment)

            postCommentPromise.then(function(response){
                console.log(response);
                detailFunction();
                $window.location.reload();
            })

            postCommentPromise.catch(function(e){
                console.log(e)
                self.fieldError = e.data.content

                if (self.fieldError == "This field is required.") {
                    self.commentError = "* Ovo polje je obavezno."
                }


            })

        } else {
            console.log('no token')
        }

    }

    //Kod koji dozvoljava ili brani pravljenje komentara
    //   u zavisnosti od toga da li je korisnik prijavljen

        $scope.userLoggedIn = false

        $scope.$watch(function(){
            if (token) {
                $scope.userLoggedIn = true
            } else {
                $scope.userLoggedIn = false
            }

        })

    self.deleteComment = function(commentId) {

        var deleteCommentUrl = 'api/comments/' + commentId + '/'
        if (token) {
            var requestDelete = {
                        method: 'DELETE',
                        url: deleteCommentUrl,
                        headers: {
                            authorization: "JWT " + token
                        }
                    }

            var deleteCommentPromise = $http(requestDelete)

            deleteCommentPromise.then(function(response){
                console.log(response)
                $window.location.reload();
            })

            deleteCommentPromise.catch(function(errResponse){
                console.log("Delete Error", errResponse)
            })

        } else {
            console.log('No token!')
        }
    }
    self.deleteCommentReply = function(commentReplyId) {

        var deleteCommentReplyUrl = 'api/comment_replies/'+ commentReplyId +'/'
        if (token) {
            var requestDelete = {
                        method: 'DELETE',
                        url: deleteCommentReplyUrl,
                        headers: {
                            authorization: "JWT " + token
                        }
                    }

            var deleteCommentReplyPromise = $http(requestDelete)

            deleteCommentReplyPromise.then(function(response){
                console.log(response)
                $window.location.reload();
            })

            deleteCommentReplyPromise.catch(function(errResponse){
                console.log('Delete Comment Reply Error', errResponse)
            })

        } else {
            console.log('No token sry mate.')
        }
    }


});