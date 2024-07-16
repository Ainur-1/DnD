import * as Types from '../../../../shared/api/gql/graphql';

export type GetCharacterInventoryQueryVariables = Types.Exact<{
  characterId: Types.Scalars['UUID']['input'];
}>;


export type GetCharacterInventoryQuery = { __typename?: 'Query', characterInventory: { __typename?: 'CharacterInventoryDto', items: Array<{ __typename?: 'InventoryItemDto', count: number, id: any, inUse: boolean, isItemProficiencyOn: boolean, item: { __typename?: 'OneOfItem', armor?: { __typename?: 'Armor', armorType: Types.ArmorType, baseArmorClass: number, costInGold: any, description?: string | null, hasStealthDisadvantage: boolean, iconUrl?: string | null, material: string, maxPossibleDexterityModifier?: number | null, name: string, requiredStrength?: number | null, tags: Array<string>, weightInPounds: number } | null, stuff?: { __typename?: 'Stuff', costInGold: any, description?: string | null, iconUrl?: string | null, name: string, tags: Array<string>, weightInPounds: number } | null, weapon?: { __typename?: 'Weapon', alternateHitDice?: Types.Dice | null, attackType: Types.WeaponAttackType, costInGold: any, criticalDistanceInFoots?: number | null, damageType: Types.WeaponDamageType, description?: string | null, hitDice: Types.Dice, iconUrl?: string | null, name: string, normalDistanceInFoots?: number | null, proficiencyType: Types.WeaponProficiencyType, properties?: Array<Types.WeaponProperty> | null, tags: Array<string>, weightInPounds: number } | null } }> } };
