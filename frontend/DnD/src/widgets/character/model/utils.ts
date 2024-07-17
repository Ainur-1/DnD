import { CharacterSkillType, ClassType, CreateCharacterMutationVariables, CreateInventoryItemDtoInput, KeyValuePairOfStringAndInt32Input, RaceType } from "@/shared/api/gql/graphql";
import { CreateCharacterFormState } from "./createCharacterFormReducer";
import { Armor, Weapon, Stuff } from "@/entities/item";

export function stateToVariables(state: CreateCharacterFormState): CreateCharacterMutationVariables {
    const raceTraitsAdjustments = state.raceTraitsAdjustments.value ?? {};
    const wallet = state.currency.value!;

    return {
        age: state.age.value!,
        alignment: state.alignment!.value!,
        charisma: state.charisma.value!,
        classId: state.classId!.value as ClassType,
        coinsAffectOnWeight: state.coinsAffectWeight!.value!,
        constitution: state.constitution!.value!,
        dexterity: state.dexterity!.value!,
        intelligence: state.intelligence!.value!,
        isPublic: state.isPublic!.value!,
        race: state.race.value?.id as RaceType,
        raceTraitsAdjustments: Object.keys(raceTraitsAdjustments).reduce((acc, key) => {
            acc.push({ key: key, value: raceTraitsAdjustments[key] });
            return acc;
          }, [] as KeyValuePairOfStringAndInt32Input[]),
        speed: state.speed.value!,
        wallet: {
            copperCoins: wallet.copper ?? 0,
            electrumCoins: wallet.electrum ?? 0,
            goldCoins: wallet.gold ?? 0,
            platinumCoins: wallet.platinum ?? 0,
            silverCoins: wallet.silver ?? 0
        },
        strength: state.strength.value!,
        wisdom: state.wisdom.value!,
        xp: state.classXp.value!,
        name: state.name.value ?? "",
        background: state.background.value ?? "",
        base64Image: state.base64Image.value,
        bonds: state.bonds.value,
        flaws: state.flaws.value,
        inventory: state.inventory.value?.map(item => {
            const base = {
                count: item.count,
                inUse: item.inUse,
                isItemProficiencyOn: item.isItemProficiencyOn,
            };
            let result : CreateInventoryItemDtoInput;

            if ("armorType" in item.item) {
                const armor = item.item as Armor;
                result = {
                    ...base,
                    maybeArmor: {
                        ...armor,
                        baseArmorClass: armor.armorClass,
                        tags: armor.tags ?? [],
                    }
                }
            } else if ("attackType" in item.item) {
                const weapon = item.item as Weapon;

                result = {
                    ...base,
                    maybeWeapon: {
                        ...weapon,
                        tags: weapon.tags ?? []
                    },
                };
            } else {
                const stuff = item.item as Stuff;
                result = {
                    ...base,
                    maybeStuff: {
                        ...stuff,
                        tags: stuff.tags ?? []
                    }
                }
            }

            return result;
        }),
        languages: state.languages.value,
        otherTraits: state.otherTraits.value,
        subrace: state.race.value?.subrace,
        selectedSkillTraits: state.skillTraitsMastery.value!.map(x => x as CharacterSkillType)
    };
}