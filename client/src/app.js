"use strict";

angular.module("chatApp", ["ui.bootstrap"]).config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	}).when("/roomlist", {
		templateUrl: "src/roomlist/roomlist.html",
		controller: "RoomListController"
	}).when("/chatroom/:id", {
		templateUrl: "src/chatroom/chatroom.html",
		controller: "ChatRoomController"
	}).otherwise({
		templateUrl:"src/login/login.html",
		controller: "LoginController"});
});
