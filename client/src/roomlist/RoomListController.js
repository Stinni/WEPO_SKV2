"use strict";

angular.module("chatApp").controller("RoomlistController", ["$scope", function RoomlistController($scope) {
	$scope.roomlist = [{
		name: "Chat Room 1",
		id: 1
	}, {
		name: "Chat Room 2",
		id: 2
	}];
}]);