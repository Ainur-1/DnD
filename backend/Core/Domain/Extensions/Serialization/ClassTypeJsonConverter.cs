using Domain.Entities.Classes;

namespace Domain.Extensions.Serialization;

internal class ClassTypeJsonConverter : MapJsonConverter<ClassType>
{
    private static readonly IReadOnlyDictionary<ClassType, string> _toStringMap = new Dictionary<ClassType, string>
    {
        [ClassType.Barbarian] = "Варвар",
        [ClassType.Bard] = "Бард",
        [ClassType.Cleric] = "Жрец",
        [ClassType.Druid] = "Друид",
        [ClassType.Fighter] = "Воин",
        [ClassType.Monk] = "Монах",
        [ClassType.Paladin] = "Паладин",
        [ClassType.Rogue] = "Плут",
        [ClassType.Sorcerer] = "Чародей",
        [ClassType.Warlock] = "Колдун",
        [ClassType.Wizard] = "Волшебник",
        [ClassType.Ranger] = "Следопыт",
    };

    private static readonly IReadOnlyDictionary<string, ClassType> _toClassTypeMap = GetReverseMap(_toStringMap);

    protected override IReadOnlyDictionary<ClassType, string> ToStringMap => _toStringMap;

    protected override IReadOnlyDictionary<string, ClassType> FromStringMap => _toClassTypeMap;
}
