import * as Types from '../../../../shared/api/gql/graphql';

export type ClassInfoQueryVariables = Types.Exact<{
  id: Types.ClassType;
}>;


export type ClassInfoQuery = { __typename?: 'Query', classInfo: { __typename?: 'Class', armorProficiency: Array<Types.ArmorType>, description: string, hitDice: Types.Dice, id: Types.ClassType, name: string, savingThrowsTraitsMastery: Array<Types.CharacterAbilityType>, skillMasteryToChooseCount: number, skillTraitsMastery: Array<Types.CharacterSkillType>, startInventoryDescription: string, weaponProficiency: Array<string> } };
