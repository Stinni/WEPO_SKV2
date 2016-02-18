"use strict";

angular.module("chatApp").controller("LoginController", ["$scope", "$location", "ChatResource", "theUser",
	function LoginController($scope, $location, ChatResource, theUser) {
	$scope.username = "";
	$scope.isLoggedIn = theUser.isLoggedIn;
	$scope.errorMessage = "";
	$scope.displayError = false;
	$scope.onLogin = function onLogin() {
		ChatResource.login($scope.username, function(success) {
			if (!success) {
				$scope.errorMessage = "Login failed";
				$scope.displayError = true;
			} else {
				theUser.userName = $scope.username;
				theUser.isLoggedIn = true;
				$scope.displayError = false;
				$location.path("/roomlist");
				$location.replace();
			}
			console.log(theUser);
			$scope.$apply();
		});
	};
}]);