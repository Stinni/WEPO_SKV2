"use strict";

angular.module("chatApp").controller("CreateRoomController", ["$scope", "$location", "ChatResource", "theUser",
function CreateRoomController($scope, $location, ChatResource, theUser) {
	if (!theUser.isLoggedIn) {
		$location.path("/login");
		$location.replace();
	}
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