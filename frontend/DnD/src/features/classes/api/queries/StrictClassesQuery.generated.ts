import * as Types from '../../../../shared/api/gql/graphql';

export type StrictClassesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StrictClassesQuery = { __typename?: 'Query', classes: Array<{ __typename?: 'Class', id: Types.ClassType, name: string }> };
