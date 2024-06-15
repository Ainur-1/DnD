using Domain.Entities.Game.Items;

namespace Domain.Entities.Items.Weapons;

public class Weapon : Item
{
    public WeaponDamageType DamageType { get; protected set; }

    public WeaponAttackType AttackType { get; protected set; }

    public WeaponProficiencyType ProficiencyType { get; protected set; }

    public int? RangeInFoots { get; protected set; }

    public int? NormalDistanceInFoots { get; protected set; }

    public int? CriticalDistanceInFoots { get; protected set; }

    public WeaponProperty[] Properties { get; protected set; } = Array.Empty<WeaponProperty>();

    public Dice HitDice { get; protected set; }

    /// <summary>
    /// Only for weapons with Versatile property
    /// <see cref="WeaponProperty"/>
    /// </summary>
    public Dice? AlternateHitDice { get; protected set; }
}
