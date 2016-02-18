"use strict";

angular.module("chatApp").controller("RoomlistController", ["$scope", "ChatResource",
	function RoomlistController($scope, ChatResource) {
	$scope.roomlist = [];
	ChatResource.getRoomlist(function(listOfRooms) {
		$scope.roomlist = listOfRooms;
		$scope.$apply();
	});
}]);