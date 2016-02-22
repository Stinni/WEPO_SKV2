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
		$scope.username = theUser.userName;
		$scope.otherUser = $routeParams.user;
		$scope.prvtMessages = (theUser.prvtMessages[$scope.otherUser] === undefined ? theUser[$scope.otherUser] : []);
		$scope.msgToSend = "";

		socket.on("recv_privatemsg", function(usr, msg) {
			if (theUser.prvtMessages[$scope.otherUser] === undefined) {
				theUser.prvtMessages[$scope.otherUser] = [];
			}

			theUser.prvtMessages[$scope.otherUser].push({nick: usr, message: msg});
			$scope.$apply(function() {
				$scope.prvtMessages = theUser.prvtMessages[$scope.otherUser];
			});
		});

		$scope.onSendPrvtMsg = function onSendPrvtMsg() {
			if (theUser.prvtMessages[$scope.otherUser] === undefined) {
				theUser.prvtMessages[$scope.otherUser] = [];
			}

			theUser.prvtMessages[$scope.otherUser].push({nick: $scope.username, message: $scope.msgToSend});
			ChatResource.sendPrivateMessage({nick: $scope.otherUser, message: $scope.msgToSend});
			$scope.prvtMessages = theUser.prvtMessages[$scope.otherUser];
			$scope.msgToSend = "";
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