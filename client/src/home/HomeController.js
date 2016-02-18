"use strict";

angular.module("chatApp").controller("HomeController", ["$scope", "$location", "ChatResource", "theUser",
	function HomeController($scope, $location, ChatResource, theUser) {
	$scope.username = theUser.userName;
	$scope.isLoggedIn = theUser.isLoggedIn;

	$scope.onLogout = function onLogout() {
		ChatResource.logout(function() {
			theUser.userName = "";
			theUser.isLoggedIn = false;
			$location.path("/login");
			$location.replace();
		});
	};
}]);