angular.module("chatApp").controller("RoomListController", function RoomListController() {
	$scope.roomlist = [{
		name: "Chat Room 1",
		id: 1
	}, {
		name: "Chat Room 2",
		id: 2
	}];
});