"use strict";

angular.module("chatApp").controller("RoomlistController", ["$scope", "$location", "ChatResource", "theUser",
	function RoomlistController($scope, $location, ChatResource, theUser) {
	console.log("Before the isLoggedIn is checked in RoomlistController:");
	console.log(theUser); // For debugging TODO: DELETE!!!
	if (!theUser.isLoggedIn) {
		$location.path("/login");
		$location.replace();
	}
	$scope.isLoggedIn = theUser.isLoggedIn;
	$scope.roomlist = [];
	ChatResource.getRoomlist(function(listOfRooms) {
		$scope.$apply(function() {
			$scope.roomlist = listOfRooms;
		});
	});
}]);