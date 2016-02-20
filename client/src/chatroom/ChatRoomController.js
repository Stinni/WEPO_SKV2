"use strict";

angular.module("chatApp").controller("ChatRoomController", ["$scope", "$routeParams", "$location", "ChatResource", "theUser",
	function ChatRoomController($scope, $routeParams, $location, ChatResource, theUser) {
	if (!theUser.isLoggedIn) {
		$location.path("/login");
		$location.replace();
	}

	$scope.errorMessage = "";
	$scope.displayError = false;

	ChatResource.joinRoom({room: $routeParams.roomKey, pass: ""}, function(success, message) {
		if (!success) {
			$scope.$apply(function() {
				$scope.errorMessage = "Joining/Creating room failed.\n The reason the server sends is: " + message;
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

	$scope.onLogout = function onLogout() {
		ChatResource.logout(function() {
			theUser.userName = "";
			theUser.isLoggedIn = false;
			$location.path("/login");
			$location.replace();
		});
	};

}]);