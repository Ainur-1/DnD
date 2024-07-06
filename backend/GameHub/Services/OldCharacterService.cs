using Contracts.Online;
using GameHub.Models;
using Service.Abstractions;

namespace GameHub.Services;

public class OldCharacterService
{
    private readonly List<GameRoom> _rooms;
    //public Guid PartyId { get; set; }
    public async Task TakeDamageAsync(Guid characterId, int damageAmount)
    {
        // Ищем персонажа по id
        var characterStats = await GetCharacterInGameStatsAsync(characterId);
        if (characterStats == null)
        {
            throw new InvalidOperationException("Статистика персонажа не найдена.");
        }

        // Применяем урон к HP персонажа
        characterStats.Hp -= damageAmount;
        if (characterStats.Hp < 0) characterStats.Hp = 0;

        // Сохраняем обновленные данные
        await UpdateCharacterInGameStatsAsync(characterId, characterStats);
        // Реализация применения урона к персонажу
        throw new NotImplementedException();
    }

    public async Task<GameCharacterDto> GetByIdAsync(Guid id, Guid partyId)
    {
        // Ищем комнату по partyId
        var room = _rooms.FirstOrDefault(r => r.PartyId == partyId);
        if (room == null)
        {
            throw new InvalidOperationException("Комната не найдена.");
        }

        // Ищем персонажа в комнате по id
        var player = room.Players.FirstOrDefault(p => p.CharacterId == id);
        if (player == null)
        {
            throw new InvalidOperationException("Персонаж не найден в комнате.");
        }

        // Создаем и возвращаем GameCharacterDto
        var characterDto = new GameCharacterDto
        {
            Id = player.CharacterId
        };

        return await Task.FromResult(characterDto);
    }

    public async Task<DynamicStatsDto> GetCharacterInGameStatsAsync(Guid characterId)
    {
        // Ищем персонажа по characterId в каждой комнате
        foreach (var room in _rooms)
        {
            var player = room.Players.FirstOrDefault(p => p.CharacterId == characterId);
            if (player != null)
            {
                var dynamicStats = player.DynamicStatsDto;
                // Возвращаем динамические характеристики персонажа
                return await Task.FromResult(new DynamicStatsDto
                {
                    Hp = dynamicStats.Hp,
                    TempHp = dynamicStats.TempHp,
                    ArmorClass = dynamicStats.ArmorClass,
                    Proficiency = dynamicStats.Proficiency,
                    Initiative = dynamicStats.Initiative,
                    Inspiration = dynamicStats.Inspiration,
                    Speed = dynamicStats.Speed,
                    HitDicesLeftCount = dynamicStats.HitDicesLeftCount,
                    IsDead = dynamicStats.IsDead,
                    IsDying = dynamicStats.IsDying,
                    DeathSaves = dynamicStats.DeathSaves
                });
            }
        }

        // Если персонаж не найден
        throw new InvalidOperationException("Персонаж не найден.");

    }

    public async Task UpdateCharacterInGameStatsAsync(Guid characterId, DynamicStatsDto updateStats)
    {
        // Ищем персонажа по characterId в каждой комнате
        foreach (var room in _rooms)
        {
            var player = room.Players.FirstOrDefault(p => p.CharacterId == characterId);
            var dynamicStats = player.DynamicStatsDto;
            if (player != null)
            {
                // Обновляем динамические характеристики персонажа

                dynamicStats.Hp = updateStats.Hp;
                dynamicStats.TempHp = updateStats.TempHp;
                dynamicStats.ArmorClass = updateStats.ArmorClass;
                dynamicStats.Proficiency = updateStats.Proficiency;
                dynamicStats.Initiative = updateStats.Initiative;
                dynamicStats.Inspiration = updateStats.Inspiration;
                dynamicStats.Speed = updateStats.Speed;
                dynamicStats.HitDicesLeftCount = updateStats.HitDicesLeftCount;
                dynamicStats.IsDead = updateStats.IsDead;
                dynamicStats.IsDying = updateStats.IsDying;
                dynamicStats.DeathSaves = updateStats.DeathSaves;

                // Завершаем выполнение метода
                return;
            }
        }

        // Если персонаж не найден, выбрасываем исключение
        throw new InvalidOperationException("Персонаж не найден.");
    }

    public async Task HandleItemSuggestion(GameRoom room, Guid? characterId, InventoryItemSuggestion suggestion)
    {
        //
    }
}
