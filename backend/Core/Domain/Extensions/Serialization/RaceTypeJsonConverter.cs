using Domain.Entities.Races;

namespace Domain.Extensions.Serialization;

internal class RaceTypeJsonConverter : MapJsonConverter<RaceType>
{
    private static readonly IReadOnlyDictionary<RaceType, string> _toStringMap = new Dictionary<RaceType, string>
    {
        [RaceType.Dwarf] = "Дварф",
        [RaceType.Elf] = "Эльф",
        [RaceType.Halfling] = "Хафлинг",
        [RaceType.Human] = "Человек",
        [RaceType.Dragonborn] = "Драконорождённый",
        [RaceType.Gnome] = "Гном",
        [RaceType.HalfElf] = "Полуэльф",
        [RaceType.HalfOrc] = "Полуорк",
        [RaceType.Tiefling] = "Тифлинг",
    };

    private static readonly IReadOnlyDictionary<string, RaceType> _toClassTypeMap = GetReverseMap(_toStringMap);

    protected override IReadOnlyDictionary<RaceType, string> ToStringMap => _toStringMap;

    protected override IReadOnlyDictionary<string, RaceType> FromStringMap => _toClassTypeMap;
}
