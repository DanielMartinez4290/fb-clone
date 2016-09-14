(function(){
    angular.module('TimeWaste')
    .controller('EditProfileController', ['Upload', '$scope', '$state', '$http','$location',               
                            function(      Upload,   $scope,   $state,   $http, $location){
    
                $scope.user = JSON.parse(localStorage['User-Data']) || undefined;
                //$scope.userImage = JSON.parse(localStorage['User-Image']) || undefined;
                $scope.userImage = {"image":'https://www.dropbox.com/s/6aosv3i1gk2m3er/gravatar-60-grey-300x300.jpg?raw=1'};
                                
                $scope.$watch(function(){
                    return $scope.file
                }, function (){
                   $scope.upload($scope.file); 
                });
                                
                console.log($scope.user);
                
                
                $scope.upload = function (file) {
                    if (file){
                        Upload.upload({
                            url: 'api/profile/editPhoto',
                            method: 'POST',
                            data: {userId: $scope.user._id},
                            file: file
                        }).progress(function(evt){
                            console.log("Image currently being uploaded");
                        }).success(function(data){
                            localStorage.setItem('User-Image', JSON.stringify(data));
                        }).error(function(error){
                            console.log(error);
                        })
                    }
                };
                

                $scope.updateUserInfo = function(){

                    var request = {
                        userId: $scope.user._id,
                        bio: $scope.user.bio,
                        email: $scope.user.email,
                        username: $scope.user.username
                    }
                    
                    $http.post('api/profile/updateUserInfo', request).success(function(response){
                        localStorage.setItem('User-Data', JSON.stringify(response));
                        console.log("Profile Updated");
                        $location.path('/');
                    }).error(function(error){
                        console.log(error);
                    });

                }
                            
                            }]);
}());