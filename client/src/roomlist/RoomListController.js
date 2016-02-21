"use strict";

angular.module("chatApp").controller("RoomlistController", ["$scope", "$location", "ChatResource", "theUser",
	function RoomlistController($scope, $location, ChatResource, theUser) {
	if (!theUser.isLoggedIn) {
		$location.path("/login");
		$location.replace();
	}
	$scope.username = theUser.userName;
	$scope.roomlist = [];
	$scope.roomName = "";

	ChatResource.getRoomlist(function(listOfRooms) {
		$scope.$apply(function() {
			$scope.roomlist = listOfRooms;
			console.log(listOfRooms);
		});
	});

	$scope.onJoinCreate = function onJoinCreate() {
		$location.path("/chatroom/" + $scope.roomName);
		$location.replace();
	};

	$scope.onLogout = function onLogout() {
		ChatResource.logout(function() {
			theUser.userName = "";
			theUser.isLoggedIn = false;
			$location.path("/login");
			$location.replace();
		});
	};
}]);