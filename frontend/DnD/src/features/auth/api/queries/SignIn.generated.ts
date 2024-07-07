import * as Types from '../../../../shared/api/gql/graphql';

export type SignInMutationVariables = Types.Exact<{
  login: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
  rememberMe: Types.Scalars['Boolean']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInPayload', uuid?: any | null } };
