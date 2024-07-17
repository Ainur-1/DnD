import { GameCharacter as GameCharacterDto } from "./signalRTypes";
import { GameCharacter } from "./types";

export function mapDtoToGameCharacter(dto: GameCharacterDto): GameCharacter {
    const { id, personality, characterStats, dynamicStats } = dto;

    return {
        id,
        mainStats: {
            armorClass: dynamicStats.armorClass,
            hitDicesLeftCount: dynamicStats.hitDicesLeftCount,
            hp: dynamicStats.hp,
            inspiration: dynamicStats.inspiration,
            isDead: dynamicStats.isDead,
            isDying: dynamicStats.isDying,
            speed: dynamicStats.speed,
            tempHp: dynamicStats.tempHp,
        },
        otherStats: {
            ...characterStats,
            maxHp: characterStats.hitPointsMaximum,
        },
        personality: {
            age: personality.age,
            aligment: personality.alignment,
            background: personality.background,
            bonds: personality.bonds,
            characterClass: personality.class,
            characterLevel: personality.level,
            characterName: personality.name,
            characterRace: personality.race,
            classFeatures: personality.classFeatures,
            flaws: personality.flaws,
            languages: personality.languages,
            otherTraits: personality.otherTraits,
            raceTraits: personality.raceTraits,
            characterImageBase64: personality.base64Image,
        }
    }
}
