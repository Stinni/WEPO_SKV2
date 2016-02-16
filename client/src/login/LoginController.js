"use strict";

angular.module("chatApp").controller("LoginController", function LoginController($scope, $Location, ChatResource) {
	$scope.errorMessage = "";
	$scope.onLogin = function onLogin() {
		ChatResource.login($scope.user, $scope.pass, function(success) {
			if (!success) {
				$scope.errorMessage = "Login failed";
			} else {
				$location("/roomlist");
			}
		});
	}
});
