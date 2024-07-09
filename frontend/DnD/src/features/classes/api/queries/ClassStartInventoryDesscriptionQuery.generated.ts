import * as Types from '../../../../shared/api/gql/graphql';

export type ClassStartInventoryDescriptionQueryVariables = Types.Exact<{
  id: Types.ClassType;
}>;


export type ClassStartInventoryDescriptionQuery = { __typename?: 'Query', classInfo: { __typename?: 'Class', startInventoryDescription: string } };
