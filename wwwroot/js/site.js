input = document.getElementById("messageInput");
input.addEventListener("keyup", function(event) {    
    if (event.keyCode === 13) {      
        event.preventDefault();      
        document.getElementById("sendButton").click();
    }
});