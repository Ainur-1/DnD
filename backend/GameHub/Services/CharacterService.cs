using Contracs.Online;
using Domain.Entities.User;
using GameHub.Models;
using Service.Abstractions.Interface;
using System.Data;
using static System.Net.Mime.MediaTypeNames;

namespace GameHub.Service
{
    public class CharacterService : ICharacterService
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

        public async Task<DinymicStatsDto> GetCharacterInGameStatsAsync(Guid characterId)
        {            
            // Ищем персонажа по characterId в каждой комнате
            foreach (var room in _rooms)
            {
                var player = room.Players.FirstOrDefault(p => p.CharacterId == characterId);
                if (player != null)
                {
                    // Возвращаем динамические характеристики персонажа
                    return await Task.FromResult(new DinymicStatsDto
                    {
                        Hp = player.DinymicStatsDto.Hp,
                        TempHp = player.DinymicStatsDto.TempHp,
                        ArmorClass = player.DinymicStatsDto.ArmorClass,
                        Profiency = player.DinymicStatsDto.Profiency,
                        Initiative = player.DinymicStatsDto.Initiative,
                        Inspiration = player.DinymicStatsDto.Inspiration,
                        Speed = player.DinymicStatsDto.Speed,
                        HitDicesLeftCount = player.DinymicStatsDto.HitDicesLeftCount,
                        IsDead = player.DinymicStatsDto.IsDead,
                        IsDying = player.DinymicStatsDto.IsDying,
                        DeathSaves = player.DinymicStatsDto.DeathSaves
                    });
                }
            }

            // Если персонаж не найден
            throw new InvalidOperationException("Персонаж не найден.");

        }

        public async Task UpdateCharacterInGameStatsAsync(Guid characterId, DinymicStatsDto updatestats)
        {
            // Ищем персонажа по characterId в каждой комнате
            foreach (var room in _rooms)
            {
                var player = room.Players.FirstOrDefault(p => p.CharacterId == characterId);
                if (player != null)
                {
                    // Обновляем динамические характеристики персонажа

                    player.DinymicStatsDto.Hp = updatestats.Hp;
                    player.DinymicStatsDto.TempHp = updatestats.TempHp;
                    player.DinymicStatsDto.ArmorClass = updatestats.ArmorClass;
                    player.DinymicStatsDto.Profiency = updatestats.Profiency;
                    player.DinymicStatsDto.Initiative = updatestats.Initiative;
                    player.DinymicStatsDto.Inspiration = updatestats.Inspiration;
                    player.DinymicStatsDto.Speed = updatestats.Speed;
                    player.DinymicStatsDto.HitDicesLeftCount = updatestats.HitDicesLeftCount;
                    player.DinymicStatsDto.IsDead = updatestats.IsDead;
                    player.DinymicStatsDto.IsDying = updatestats.IsDying;
                    player.DinymicStatsDto.DeathSaves = updatestats.DeathSaves;

                    // Завершаем выполнение метода
                    return;
                }
            }

            // Если персонаж не найден, выбрасываем исключение
            throw new InvalidOperationException("Персонаж не найден.");
        }
    }
}
