namespace GameHub.Dtos;

public record HealUpdateDto
{
    public int? HpAddition { get; init; }

    public int? TempHp { get; init; }

    public int? UsedHitDicesCount { get; init; }


    public bool AreValidArguments => (HpAddition.HasValue && HpAddition.Value > 0 
        || TempHp.HasValue && TempHp.Value >= 0 || UsedHitDicesCount.HasValue && UsedHitDicesCount.Value > 0);
}
