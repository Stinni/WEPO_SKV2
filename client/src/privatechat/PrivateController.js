"use strict";

angular.module("chatApp").controller("PrivateController", ["$scope", "$location", "SocketResource", "ChatResource", "theUser",
	function ChatRoomController($scope, $location, SocketResource, ChatResource, theUser) {
	if (!theUser.isLoggedIn) {
		$location.path("/login");
		$location.replace();
	} else {
		var socket = SocketResource.theSocket();
		$scope.username = theUser.userName;
		$scope.listOfUsers = [];
		$scope.listOfActiveChats = theUser.prvtMessages;
		$scope.msgToSend = "";

		socket.on("userlist", function(userlist) {
			$scope.$apply(function() {
				$scope.listOfUsers = userlist;
			});
		});

		ChatResource.getListOfUsers();

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