namespace Domain.Extensions;

using Domain.Entities.Races;
using System.Collections.Generic;

public static class RaceTypeExtensions
{
    private static readonly Dictionary<RaceType, string> RaceTypeToStringMap = new Dictionary<RaceType, string>
    {
        { RaceType.Dwarf, "Дварф" },
        { RaceType.Elf, "Эльф" },
        { RaceType.Halfling, "Полурослик" },
        { RaceType.Human, "Человек" },
        { RaceType.Dragonborn, "Драконорождённый" },
        { RaceType.Gnome, "Гном" },
        { RaceType.HalfElf, "Полуэльф" },
        { RaceType.HalfOrc, "Полуорк" },
        { RaceType.Tiefling, "Тифлинг" }
    };

    private static readonly Dictionary<string, RaceType> StringToRaceTypeMap = RaceTypeToStringMap
        .ToDictionary(x => x.Value, x => x.Key);

    public static string ToLocalizedString(this RaceType raceType)
    {
        return RaceTypeToStringMap[raceType];
    }

    public static RaceType? TryParse(string value)
    {
        if (!StringToRaceTypeMap.ContainsKey(value))
            return null;

        return StringToRaceTypeMap[value];
    }
}
