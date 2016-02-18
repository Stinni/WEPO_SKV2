"use strict";

angular.module("chatApp", ["ngRoute", "ui.bootstrap"]).config(["$routeProvider", function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	}).when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	}).when("/roomlist", {
		templateUrl: "src/roomlist/roomlist.html",
		controller: "RoomlistController"
	}).when("/chatroom/:id", {
		templateUrl: "src/chatroom/chatroom.html",
		controller: "ChatRoomController"
	}).when("/createroom", {
		templateUrl: "src/createroom/createroom.html",
		controller: "CreateRoomController"
	}).otherwise({
		redirectTo:"/login"});
}]);
