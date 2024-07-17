import * as Types from '../../../../shared/api/gql/graphql';

export type CreatePartyMutationVariables = Types.Exact<{
  accessCode: Types.Scalars['String']['input'];
}>;


export type CreatePartyMutation = { __typename?: 'Mutation', createParty: { __typename?: 'CreatePartyPayload', uuid?: any | null } };
