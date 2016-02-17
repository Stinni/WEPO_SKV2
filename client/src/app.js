"use strict";

angular.module("chatApp", ["ng", "ngRoute", "ui.bootstrap"])
.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl: "login/login.html",
		controller: "LoginController"
	}).when("/roomlist", {
		templateUrl: "roomlist/roomlist.html",
		controller: "RoomListController"
	}).when("/chatroom/:id", {
		templateUrl: "chatroom/chatroom.html",
		controller: "ChatRoomController"
	}).when("/createroom", {
		templateUrl: "createroom/createroom.html",
		controller: "CreateRoomController"
	}).otherwise({
		redirectTo:"/login"});
}]);
