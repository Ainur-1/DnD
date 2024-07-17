import * as Types from '../../../../shared/api/gql/graphql';

export type CarouselCharactersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CarouselCharactersQuery = { __typename?: 'Query', myCharacters: Array<{ __typename?: 'CharacterDto', id: any, isInParty: boolean, isDead: boolean, personality: { __typename?: 'CharacterPersonalityDto', name: string, race: string, class: string, level: number, base64Image?: string | null, canLevelUp: boolean } }> };
