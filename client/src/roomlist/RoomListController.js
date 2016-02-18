"use strict";

angular.module("chatApp").controller("RoomlistController", ["$scope", "$location", "ChatResource", "theUser",
	function RoomlistController($scope, $location, ChatResource, theUser) {
	if (!theUser.isLoggedIn) {
		$location.path("/login");
		$location.replace();
		$scope.$apply();
	}
	$scope.isLoggedIn = theUser.isLoggedIn;
	$scope.roomlist = [];
	ChatResource.getRoomlist(function(listOfRooms) {
		$scope.roomlist = listOfRooms;
		$scope.$apply();
	});
}]);