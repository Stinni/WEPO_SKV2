"use strict";

angular.module("chatApp").controller("LoginController", ["$scope", "$http", "$location", "ChatResource",
	function LoginController($scope, $http, $location, ChatResource) {
	$scope.username = "";
	$scope.errorMessage = "";
	$scope.displayError = false;
	$scope.onLogin = function onLogin() {
		ChatResource.login($scope.username, function(success) {
			if (!success) {
				console.log("if not success (part of login function), before supposed change of errorMessage.");
				$scope.errorMessage = "Login failed";
				$scope.displayError = true;
			} else {
				console.log("if success (part of login function), before supposed redirection to roomlist page.");
				$scope.displayError = false;
				$location.path("/roomlist");
				$location.replace();
			}
			$scope.$apply();
		});
	};
}]);