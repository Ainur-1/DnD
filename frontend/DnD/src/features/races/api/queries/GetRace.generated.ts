import * as Types from '../../../../shared/api/gql/graphql';

export type GetRaceQueryVariables = Types.Exact<{
  raceId: Types.RaceType;
}>;


export type GetRaceQuery = { __typename?: 'Query', raceInfo: { __typename?: 'Race', adultAge: number, id: Types.RaceType, languages: Array<string>, name: string, recommendedAlignmentDescription: string, size: Types.Size, speed: number, raceTraits: Array<{ __typename?: 'RaceTraitDescriptor', description: string, name: string, options?: Array<string> | null }>, subRacesAdjustments: Array<{ __typename?: 'SubRaceInfo', name: string, abilities: Array<{ __typename?: 'AbilityBuff', abilityType: Types.CharacterAbilityType, buffValue: number }>, raceTraits: Array<{ __typename?: 'RaceTraitDescriptor', description: string, name: string, options?: Array<string> | null }> }>, abilities: Array<{ __typename?: 'AbilityBuff', abilityType: Types.CharacterAbilityType, buffValue: number }> } };
