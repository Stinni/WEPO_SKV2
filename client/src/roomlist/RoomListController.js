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
	$scope.displayJoinCreateError = false;
	$scope.displayJoinError = false;

	ChatResource.getRoomlist(function(listOfRooms) {
		$scope.$apply(function() {
			$scope.roomlist = listOfRooms;
			console.log(listOfRooms);
		});
	});

	$scope.onJoinCreate = function onJoinCreate() {
		var newRoom = {
			room: $scope.roomName,
			pass: ""
		};
		ChatResource.joinRoom(newRoom, function(success, message) {
			if (!success) {
				$scope.$apply(function() {
					$scope.errorMessage = "Joining/Creating room failed: " + message;
					$scope.displayJoinCreateError = true;
				});
			} else {
				$scope.$apply(function() {
					$scope.errorMessage = "";
					$scope.displayJoinCreateError = false;
					$location.path("/chatroom/" + $scope.roomName);
					$location.replace();
				});
			}
		});
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