using Domain.Entities.Game.Items;

namespace Domain.Entities.Items.Weapons;

public record Weapon : Item
{
    public WeaponDamageType DamageType { get; init; }

    public WeaponAttackType AttackType { get; init; }

    public WeaponProficiencyType ProficiencyType { get; init; }

    public int? NormalDistanceInFoots { get; init; }

    public int? CriticalDistanceInFoots { get; init; }

    public WeaponProperty[]? Properties { get; init; }

    public Dice HitDice { get; init; }

    /// <summary>
    /// Only for weapons with Versatile property
    /// <see cref="WeaponProperty"/>
    /// </summary>
    public Dice? AlternateHitDice { get; init; }
}
