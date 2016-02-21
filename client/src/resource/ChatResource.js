"use strict";

angular.module("chatApp").factory("ChatResource", ["SocketResource", function ChatResource(SocketResource) {
	var socket = SocketResource.theSocket();
	return {
		login: function login(username, callback) {
			socket.emit("adduser", username, function(available){
				callback(available ? true : false);
			});
		},
		getRoomlist: function getRoomlist() {
			socket.emit("rooms");
		},
		joinRoom: function joinRoom(roomToJoin, callback) {
			socket.emit("joinroom", roomToJoin, function(success, message) {
				callback(success ? true : false, message);
			});
		},
		sendMessage: function sendMessage(msg) {
			socket.emit("sendmsg", msg);
		},
		partRoom: function partRoom(room) {
			console.log("partRoom function in ChatResource called...");
			socket.emit("partroom", room);
			socket.on("servermessage", function(msg) {
				console.log("partRoom function in ChatResource picked up a servermessage with the message: " + msg);
			});
		},
		logout: function logout(callback) {
			socket.emit("disconnect");
			callback();
		}
	};
}]);

// The server supports the following commands:

// adduser
// rooms
// joinroom
// The server responds by emitting the following events:
// "updateusers" (to all participants in the room),
// "updatetopic" (to the newly joined user, not required to handle this),
// "servermessage" with the first parameter set to "join" ( to all participants in the room, informing about
// the newly added user). If a new room is being created, the message "updatechat" is also emitted. 
// sendmsg
// partroom

// privatemsg
// Used if the user wants to send a private message to another user.
// Parameters:
// an object containing the following properties: {nick: "the userid which the message should be sent to", message: "The message itself" }
// a callback function, accepting a single boolean parameter, stating if the message could be sent or not.
// The server will then emit the "recv_privatemsg" event to the user which should receive the message.
 
// disconnect
// Used when a user leaves the chat application.
// There are no parameters.
// The server will emit the following events: "updateusers" to each room the user had joined (and hadn't explicitly left), "servermessage" with the first parameter set to "quit".
 
// kick
// When a room creator wants to kick a user from the room.
// Parameters:
// an object containing the following properties: { user : "The username of the user being kicked", room: "The ID of the room"
// a callback function, accepting a single boolean parameter, stating if the user could be kicked or not.
// The server will emit the following events if the user was successfully kicked: "kicked" to the user being kicked, and "updateusers" to the rest of the users in the room.
 
// ban
// Allows an operator to ban another user from a room.
// Parameters:
// an object containing the following properties: { user : "The username of the user being banned", room: "The ID of the room"
// a callback function, accepting a single boolean parameter, stating if the user could be banned or not. 
// The server will emit the following events if the user was successfully banned: "banned" to the user being banned, and "updateusers" to the rest of the users in the room.
 
// users
// This should get called to get a list of all connected users.
// There are no parameters for this function.
// The server will emit the "userlist" event back to the caller, containing a list of userids currently "logged in"
 
// Note that the following commands are also supported, but it is not required to use them (unless you want to write a really awesome chat application). Feel free to experiment with these features.

// op
// Allows the creator of a room to convert another user to a "op", i.e. grant that user the same priviledges as the creator of the room.
 
// deop
// Allows an op to "deop" another operator. Note: there is nothing that prevents the following events from happening: A creates a room, B joins, A ops B, B deops A.
 
// setpassword
// Sets a password for a room. Only an OP can perform this action.
 
// removepassword
// Reverts the "setpassword" command.
 
// settopic
// Sets a "topic" for a room. Only an OP can perform this action.
 
// unban
// Reverts the "ban" operation.