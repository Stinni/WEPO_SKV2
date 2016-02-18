"use strict";

angular.module("chatApp").controller("ChatRoomController", ["$scope", "$http", "ChatResource",
	function ChatRoomController($scope, $http, ChatResource) {
	$scope.message = "Hello from ChatRoom Page";
}]);
