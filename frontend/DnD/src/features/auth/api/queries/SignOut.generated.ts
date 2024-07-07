import * as Types from '../../../../shared/api/gql/graphql';

export type SignOutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: { __typename?: 'SignOutPayload', boolean?: boolean | null } };
