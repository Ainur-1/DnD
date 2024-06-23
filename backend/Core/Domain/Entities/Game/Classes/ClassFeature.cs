namespace Domain.Entities.Classes;

public class ClassFeature
{
    public string Name { get; set; }

    public string Description { get; set; }

    /// <summary>
    /// Minimal required character level to get this feature
    /// </summary>
    public int MinCharacterRequiredLevel { get; set; }

    // some features changes their mastery with level-up (for example, on level 1 Feature had 1d6, but on level 5 it might be 1d12)
    /// <summary>
    /// Adjusts level or mastery (level depended feature trait)
    /// </summary>
    public string? ClassFeatureMastery { get; set; }

    public override string ToString() => string.IsNullOrEmpty(ClassFeatureMastery) ? Name : $"{Name} {ClassFeatureMastery}";
}
