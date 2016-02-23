"use strict";

angular.module("chatApp").controller("ChatRoomController", ["$scope", "$routeParams", "$location", "SocketResource", "ChatResource", "theUser",
	function ChatRoomController($scope, $routeParams, $location, SocketResource, ChatResource, theUser) {
	if (!theUser.isLoggedIn) {
		$location.path("/login");
		$location.replace();
	} else {
		var socket = SocketResource.theSocket();
		$scope.username = theUser.userName;
		$scope.roomKey = $routeParams.roomKey;
		$scope.errorMessage = "";
		$scope.displayError = false;
		$scope.messages = [];
		$scope.listOfOps = [];
		$scope.listOfUsers = [];
		$scope.msgToSend = "";

		ChatResource.joinRoom({room: $routeParams.roomKey, pass: ""}, function(success, message) {
			if (!success) {
				$scope.$apply(function() {
					$scope.errorMessage = "Joining/Creating room failed. The message that the server sends is: " + message;
					$scope.displayError = true;
				});
			} else {
				$scope.$apply(function() {
					$scope.errorMessage = "";
					$scope.displayError = false;
				});
			}
		});

		$scope.onSendMsg = function onSendMsg() {
			ChatResource.sendMessage({roomName: $scope.roomKey, msg: $scope.msgToSend});
			$scope.msgToSend = "";
		};

		socket.on("updatechat", function(room, msgList) {
			if (room === $scope.roomKey) {
				$scope.$apply(function() {
					$scope.messages = msgList;
				});
			}
		});

		socket.on("updateusers", function(room, users, ops) {
			if (room === $scope.roomKey) {
				$scope.$apply(function() {
					$scope.listOfOps = ops;
					$scope.listOfUsers = users;
				});
			}
		});

		$scope.$on("$locationChangeStart", function(event, next, current) {
			ChatResource.partRoom($scope.roomKey);
		});

		$scope.onPartRoom = function onPartRoom() {
			$location.path("/roomlist");
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
	}
}]);