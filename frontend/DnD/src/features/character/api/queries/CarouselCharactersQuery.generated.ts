import * as Types from '../../../../shared/api/gql/graphql';

export type CarouselCharactersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CarouselCharactersQuery = { __typename?: 'Query', myCharacters: Array<{ __typename?: 'CharacterDto', id: any, isInParty: boolean, personality: { __typename?: 'CharacterPersonalityDto', age: number, alignment: Types.CharacterAlignmentType, background: string, base64Image?: string | null, bonds: Array<string>, class: Types.ClassType, flaws: Array<string>, languages: Array<string>, level: number, name: string, otherTraits: Array<string>, race: string, canLevelUp: boolean }, dynamicStats: { __typename?: 'DynamicStatsDto', isDead: boolean } }> };
