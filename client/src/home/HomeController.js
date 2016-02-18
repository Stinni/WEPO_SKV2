"use strict";

angular.module("chatApp").controller("HomeController", ["$scope", "$location", "ChatResource", "theUser",
	function HomeController($scope, $location, ChatResource, theUser) {
	$scope.isLoggedIn = theUser.isLoggedIn;
}]);