import * as Types from '../../../../shared/api/gql/graphql';

export type UserPartiesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserPartiesQuery = { __typename?: 'Query', myParties: Array<{ __typename?: 'UserPartyDto', accessCode: string, gameMasterId: any, id: any, inGameCharacter?: { __typename?: 'PartyCharacterDto', characterName: string } | null }> };
