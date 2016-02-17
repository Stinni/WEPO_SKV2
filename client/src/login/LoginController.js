"use strict";

angular.module('chatApp').controller('LoginController', ['$scope', '$http', '$location',
	function LoginController($scope, $http, $location, ChatResource) {
	$scope.message = "Hello from Login Page";
	$scope.errorMessage = "";
	$scope.onLogin = function onLogin() {
		ChatResource.login($scope.user, $scope.pass, function(success) {
			if (!success) {
				$scope.errorMessage = "Login failed";
			} else {
				$location("/roomlist");
			}
		});
	};
}]);