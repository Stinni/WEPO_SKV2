"use strict";

angular.module("chatApp").controller("PrivateChatController", ["$scope", "$routeParams", "$location", "SocketResource", "ChatResource", "theUser",
	function ChatRoomController($scope, $routeParams, $location, SocketResource, ChatResource, theUser) {
	if (!theUser.isLoggedIn) {
		$location.path("/login");
		$location.replace();
	} else if ($routeParams.user === theUser.userName) {
		$location.path("/private");
		$location.replace();
	} else {
		var socket = SocketResource.theSocket();
		$scope.errorMessage = "";
		$scope.displayError = false;
		$scope.username = theUser.userName;
		$scope.otherUser = $routeParams.user;
		$scope.prvtMessages = (theUser.prvtMessages[$scope.otherUser] !== undefined ? theUser.prvtMessages[$scope.otherUser] : []);
		$scope.msgToSend = "";

		socket.on("recv_privatemsg", function(usr, msg) {
			if (theUser.prvtMessages[usr] === undefined) {
				theUser.prvtMessages[usr] = [];
			}

			theUser.prvtMessages[usr].push({nick: usr, message: msg});
			$scope.$apply(function() {
				$scope.prvtMessages = theUser.prvtMessages[$scope.otherUser];
			});
		});

		$scope.onSendPrvtMsg = function onSendPrvtMsg() {
			console.log("onSendPrvtMsg function called in PrivateChatController");
			if (theUser.prvtMessages[$scope.otherUser] === undefined) {
				theUser.prvtMessages[$scope.otherUser] = [];
				console.log("if clause in onSendPrvtMsg function initilizes the user's chat with: " + $scope.otherUser);
			}

			theUser.prvtMessages[$scope.otherUser].push({nick: $scope.username, message: $scope.msgToSend});
			console.log(theUser.prvtMessages[$scope.otherUser]);
			ChatResource.sendPrivateMessage({nick: $scope.otherUser, message: $scope.msgToSend}, function(success) {
				if (!success) {
					$scope.errorMessage = "There was a problem with sending the message. Please try again later.";
					$scope.displayError = true;
				} else {
					$scope.errorMessage = "";
					$scope.displayError = false;
					$scope.prvtMessages = theUser.prvtMessages[$scope.otherUser];
					$scope.msgToSend = "";
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
	}
}]);