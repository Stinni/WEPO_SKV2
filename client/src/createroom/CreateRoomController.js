"use strict";

angular.module('chatApp').controller('CreateRoomController', ['$scope', '$http', 'ChatResource',
function CreateRoomController($scope, $http, ChatResource) {
	$scope.message = "Hello from Create Room Page";
}]);
