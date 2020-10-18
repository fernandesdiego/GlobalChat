using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace GlobalChat.Hubs
{
    public class ChatHub : Hub
    {    
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async override Task OnConnectedAsync()
        {            
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            UserHandler.ConnectedIds.Add(Context.ConnectionId);            
            await UpdateUsers();
            await base.OnConnectedAsync();                        
        }

        public async override Task OnDisconnectedAsync(Exception exception)
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            await UpdateUsers();
            await base.OnDisconnectedAsync(exception);
        }

        public async Task UpdateUsers()
        {
            await Clients.All.SendAsync("UpdateUsers", UserHandler.ConnectedIds);
        }

    }
}