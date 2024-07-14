import * as Types from '../../../../shared/api/gql/graphql';

export type UserPartyInfoQueryVariables = Types.Exact<{
  partyId: Types.Scalars['UUID']['input'];
}>;


export type UserPartyInfoQuery = { __typename?: 'Query', party: { __typename?: 'UserPartyDto', accessCode: string, gameMasterId: any, id: any, inGameCharactersIds: Array<any>, inGameCharacter?: { __typename?: 'PartyCharacterDto', characterName: string, id: any } | null } };
