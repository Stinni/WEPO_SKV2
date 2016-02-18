"use strict";

angular.module("chatApp").controller("LoginController", ["$scope", "$location", "ChatResource", "theUser",
	function LoginController($scope, $location, ChatResource, theUser) {
	console.log("Before the isLoggedIn is checked in LoginController:");
	console.log(theUser); // For debugging TODO: DELETE!!!
	if (theUser.isLoggedIn) {
		$location.path("/roomlist");
		$location.replace();
	}
	$scope.username = "";
	$scope.errorMessage = "";
	$scope.displayError = false;
	$scope.onLogin = function onLogin() {
		ChatResource.login($scope.username, function(success) {
			if (!success) {
				console.log(theUser); // For debugging TODO: DELETE!!!
				$scope.$apply(function() {
					$scope.errorMessage = "Login failed";
					$scope.displayError = true;
				});
			} else {
				$scope.$apply(function() {
					theUser.userName = $scope.username;
					theUser.isLoggedIn = true;
					console.log(theUser); // For debugging TODO: DELETE!!!
					$scope.displayError = false;
					$location.path("/roomlist");
					$location.replace();
				});
			}
		});
	};
}]);