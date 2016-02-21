"use strict";

angular.module("chatApp").factory("SocketResource", function() {
	var socket = io.connect('http://localhost:8080');
	return {
		theSocket: function theSocket() {
			return socket;
		}
	};
});