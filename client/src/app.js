"use strict";

angular.module("chatApp", ["ngRoute", "ui.bootstrap"]).config(["$routeProvider", function($routeProvider) {
	$routeProvider
	.when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	}).when("/about", {
		templateUrl: "src/home/about.html",
		controller: "HomeController"
	}).when("/roomlist", {
		templateUrl: "src/roomlist/roomlist.html",
		controller: "RoomlistController"
	}).when("/chatroom/:roomKey", {
		templateUrl: "src/chatroom/chatroom.html",
		controller: "ChatRoomController"
	}).when("/chatroom/", {
		templateUrl: "src/roomlist/roomlist.html",
		controller: "RoomlistController"
	}).when("/private", {
		templateUrl: "src/privatechat/private.html",
		controller: "PrivateController"
	}).when("/privatechat/:user", {
		templateUrl: "src/privatechat/privatechat.html",
		controller: "PrivateChatController"
	}).when("/privatechat/", {
		templateUrl: "src/roomlist/roomlist.html",
		controller: "RoomlistController"
	}).otherwise({
		redirectTo:"/login"});
}]).value("theUser", {
	userName: "",
	isLoggedIn: false,
	prvtMessages: []
});