"use strict";

angular.module("chatApp").controller("RoomlistController", ["$scope", "$location", "ChatResource", "theUser",
	function RoomlistController($scope, $location, ChatResource, theUser) {
	if (!theUser.isLoggedIn) {
		$location.path("/login");
		$location.replace();
	}
	$scope.username = theUser.userName;
	$scope.roomlist = [];

	ChatResource.theSocket().on("roomlist", function(listOfRooms) {
		$scope.$apply(function() {
			$scope.roomlist = listOfRooms;
		});
	});
	ChatResource.getRoomlist();

	$scope.onLogout = function onLogout() {
		ChatResource.logout(function() {
			theUser.userName = "";
			theUser.isLoggedIn = false;
			$location.path("/login");
			$location.replace();
		});
	};
}]);