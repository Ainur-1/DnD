import * as Types from '../../../../shared/api/gql/graphql';

export type GetRacesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetRacesQuery = { __typename?: 'Query', races: Array<{ __typename?: 'Race', id: Types.RaceType, name: string, subRacesAdjustments: Array<{ __typename?: 'SubRaceInfo', name: string }> }> };
