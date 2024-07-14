import { CharacterAlignmentType, CharacterSkillType, ClassType, CreateCharacterMutationVariables, KeyValuePairOfStringAndInt32Input, RaceType } from "@/shared/api/gql/graphql";
import { Aligments } from "@/shared/types/domainTypes";
import { CreateCharacterFormState } from "./createCharacterFormReducer";

const map: Map<Aligments, CharacterAlignmentType>
= new Map([
    [Aligments.chaoticEvil, CharacterAlignmentType.ChaoticEvil],
    [Aligments.chaoticGood, CharacterAlignmentType.ChaoticGood],
    [Aligments.chaoticNeutral, CharacterAlignmentType.ChaoticNeutral],
    [Aligments.lawfulEvil, CharacterAlignmentType.LawfulEvil],
    [Aligments.lawfulGood, CharacterAlignmentType.LawfulGood],
    [Aligments.lawfulNeutral, CharacterAlignmentType.LawfulNeutral],
    [Aligments.neutralEvil, CharacterAlignmentType.NeutralEvil],
    [Aligments.neutralGood, CharacterAlignmentType.NeutralGood],
    [Aligments.trueNeutral, CharacterAlignmentType.TrueNeutral],
]);


function alignmentToVariable(alignment: Aligments): CharacterAlignmentType {
    const result = map.get(alignment);
    if (result == undefined) 
        throw new Error("Undefined Alignment");

    return result as CharacterAlignmentType;
}

export function stateToVariables(state: CreateCharacterFormState): CreateCharacterMutationVariables {
    const raceTraitsAdjustments = state.raceTraitsAdjustments.value ?? {};
    const wallet = state.currency.value!;

    return {
        age: state.age.value!,
        alignment: alignmentToVariable(state.alignment!.value!),
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
        inventory: state.inventory.value,
        languages: state.languages.value,
        otherTraits: state.otherTraits.value,
        subrace: state.race.value?.subrace,
        selectedSkillTraits: state.skillTraitsMastery.value!.map(x => x as CharacterSkillType)
    };
}