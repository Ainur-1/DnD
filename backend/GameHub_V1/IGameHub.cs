using Domain.Entities.Game.Items;
using GameHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub
{
    public interface IGameHub
    {
        Task<GameRoom> UpdateCharacterStat(string roomId, string playerId, string statName, int newValue);
        Task<GameRoom> AddToInventory(string roomId, string playerId, InventoryItem newItem);
        Task<GameRoom> RemoveFromInventory(string roomId, string playerId, string itemId);
        Task<GameRoom> CreateRoom(string roomName);
        Task<GameRoom?> JoinRoom(string roomId, string playerName, string accessCode, string playerId, string partyId);
        Task GetAvailableRooms();
        Task AcceptInventory(string roomId, string itemId);
        Task Damage(string roomId, string targetPlayerId, int damageAmount);
        Task EndGame(string roomId);
        Task OnDisconnectedAsync(Exception? exception);
    }
}
