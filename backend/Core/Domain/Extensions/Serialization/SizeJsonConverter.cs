using Domain.Entities.Races;

namespace Domain.Extensions.Serialization;

internal class SizeJsonConverter : MapJsonConverter<Size>
{
    private static readonly IReadOnlyDictionary<Size, string> _toStringMap = new Dictionary<Size, string>
    {
        [Size.Small] = "Маленький",
        [Size.Medium] = "Обычный",
        [Size.Big] = "Большой",
    };

    private static readonly IReadOnlyDictionary<string, Size> _toSizeMap = GetReverseMap(_toStringMap);

    protected override IReadOnlyDictionary<Size, string> ToStringMap => _toStringMap;

    protected override IReadOnlyDictionary<string, Size> FromStringMap => _toSizeMap;
}
