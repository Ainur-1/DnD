using GameHub.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub.Repositories
{
    internal static class RoomRepository
    {
        private static readonly ConcurrentDictionary<Guid, GameRoomState> _rooms = new();

        public static void Add(GameRoomState room)
        {
            _rooms.TryAdd(room.PartyId, room);
        }
        public static void Delete(Guid roomId)
        {
            _rooms.TryRemove(roomId, out _);
        }
        public static bool Contains(Guid roomId)
        {
            return _rooms.ContainsKey(roomId);
        }

        public static GameRoomState Get(Guid roomId)
        {
            _rooms.TryGetValue(roomId, out var room);
            return room;
        }
    }
}
