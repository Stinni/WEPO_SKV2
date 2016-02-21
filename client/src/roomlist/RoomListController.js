"use strict";

angular.module("chatApp").controller("RoomlistController", ["$scope", "$location", "SocketResource", "ChatResource", "theUser",
	function RoomlistController($scope, $location, SocketResource, ChatResource, theUser) {
	if (!theUser.isLoggedIn) {
		$location.path("/login");
		$location.replace();
	}

	var socket = SocketResource.theSocket();
	$scope.username = theUser.userName;
	$scope.roomlist = [];
	$scope.roomName = "";

	socket.on("roomlist", function(listOfRooms) {
		$scope.$apply(function() {
			$scope.roomlist = listOfRooms;
		});
	});

	socket.on("servermessage", function(msg) {
		if (msg === "join") {
			ChatResource.getRoomlist();
		}
	});

	ChatResource.getRoomlist();

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