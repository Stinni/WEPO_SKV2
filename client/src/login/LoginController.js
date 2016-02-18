"use strict";

angular.module("chatApp").controller("LoginController", ["$scope", "$http", "$location", "ChatResource",
	function LoginController($scope, $http, $location, ChatResource) {
	$scope.username = "";
	$scope.errorMessage = "";
	$scope.displayError = false;
	$scope.onLogin = function onLogin() {
		ChatResource.login($scope.username, function(success) {
			if (!success) {
				$scope.errorMessage = "Login failed";
				$scope.displayError = true;
			} else {
				$scope.displayError = false;
				$location.path("/roomlist");
				$location.replace();
			}
			$scope.$apply();
		});
	};
}]);