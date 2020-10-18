"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/ChatHub").build();

document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = `${user} : ${msg}`;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    li.className = "list-group-item"
    document.getElementById("messagesList").appendChild(li);
    document.getElementById("messagesList").scrollBy(0, window.innerHeight)
});

connection.on("UserConnected", function (connectionId){
    var li = document.createElement("li");
    li.textContent = `User ${connectionId} connected.`;
    li.className = "list-group-item"
    document.getElementById("messagesList").appendChild(li);
});

connection.on("UpdateUsers", function(connectedUsers){
    var ul = document.getElementById("usersList");        
    ul.innerHTML = null;

    connectedUsers.forEach((element) => {
        console.log("logged user: " + element);
        var li = document.createElement("li");
        li.textContent = element;        
        li.className = "list-group-item";
        ul.appendChild(li);
    });
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {    
    var message = document.getElementById("messageInput").value;
    if(message != ""){
        connection.invoke("SendMessage", connection.connectionId, message).catch(function (err) {
            return console.error(err.toString());
        });
    }    
    document.getElementById("messageInput").value = null;
});