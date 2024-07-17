import * as Types from '../../../../shared/api/gql/graphql';

export type CharacterDeathSavesQueryVariables = Types.Exact<{
  characterId: Types.Scalars['UUID']['input'];
}>;


export type CharacterDeathSavesQuery = { __typename?: 'Query', character: { __typename?: 'CharacterDto', dynamicStats?: { __typename?: 'DynamicStatsDto', isDying: boolean, isDead: boolean, deathSaves?: { __typename?: 'DeathSavesDto', failureCount: number, successCount: number } | null } | null } };
