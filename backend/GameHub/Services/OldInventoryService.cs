using GameHub.Models;

namespace GameHub.Services;

//todo: переделай под себя в таком формате
// здесь можешь создавать свои локальные сервисы, которые оперируют твоими моделями, их не нужно тянуть в сервисы абстрактные
// взаимодействие с доменными моделями внутри твоего сервиса (прочитать из базы/ заюзать сервис) через абстракции из Core
public class OldInventoryService
{
    //// old party service
    //private readonly List<GameRoomState> _rooms;
    //public Guid PartyId { get; set; }
    //public int xp { get; set; }

    //public OldInventoryService(List<GameRoomState> rooms)
    //{
    //    _rooms = rooms;
    //}

    ////public async Task<bool> IsGameMasterAsync(Guid userId, Guid partyId)
    ////{
    ////    var room = _rooms.FirstOrDefault(r => r.PartyId == partyId);
    ////    return room.GameMasterId == userId;

    ////}

    //public async Task DisbandPartyAsync(Guid partyId, int xp)
    //{
    //    var room = _rooms.FirstOrDefault(r => r.PartyId == partyId);
    //    if (room != null)
    //    {
    //        foreach (var player in room.Players)
    //        {
    //            player.XP += xp;
    //        }

    //        _rooms.Remove(room);
    //    }
    //}

    //internal async Task HandleItemSuggestion(GameRoomState room, Guid? characterId, InventoryItemSuggestion suggestion)
    //{
    //    throw new NotImplementedException();
    //}

    //internal async Task<bool> CheckInventoryItem(Guid guid, string v, int count)
    //{
    //    throw new NotImplementedException();
    //}
}
