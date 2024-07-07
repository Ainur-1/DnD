import * as Types from '../../../../shared/api/gql/graphql';

export type SignUpMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  password: Types.Scalars['String']['input'];
  username: Types.Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpPayload', boolean?: boolean | null, errors?: Array<{ __typename?: 'FieldNameTakenError', message: string } | { __typename?: 'InvalidArgumentValueError', message: string }> | null } };
