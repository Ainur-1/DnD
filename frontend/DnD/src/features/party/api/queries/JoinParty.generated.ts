import * as Types from '../../../../shared/api/gql/graphql';

export type JoinPartyMutationVariables = Types.Exact<{
  accessCode: Types.Scalars['String']['input'];
  characterId: Types.Scalars['UUID']['input'];
  partyId: Types.Scalars['UUID']['input'];
}>;


export type JoinPartyMutation = { __typename?: 'Mutation', joinParty: { __typename?: 'JoinPartyPayload', userPartyDto?: { __typename?: 'UserPartyDto', id: any } | null } };
