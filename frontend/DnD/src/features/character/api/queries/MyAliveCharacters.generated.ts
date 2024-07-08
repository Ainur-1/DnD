import * as Types from '../../../../shared/api/gql/graphql';

export type MyAliveCharactersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyAliveCharactersQuery = { __typename?: 'Query', myCharacters: Array<{ __typename?: 'CharacterDto', id: any, personality: { __typename?: 'CharacterPersonalityDto', name: string, base64Image?: string | null } }> };
