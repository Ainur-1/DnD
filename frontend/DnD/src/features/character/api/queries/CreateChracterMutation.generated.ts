import * as Types from '../../../../shared/api/gql/graphql';

export type CreateCharacterMutationVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  age: Types.Scalars['Int']['input'];
  xp: Types.Scalars['Int']['input'];
  speed: Types.Scalars['Int']['input'];
  alignment: Types.CharacterAlignmentType;
  background?: Types.InputMaybe<Types.Scalars['String']['input']>;
  bonds?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  flaws?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  classId: Types.ClassType;
  coinsAffectOnWeight: Types.Scalars['Boolean']['input'];
  languages?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  otherTraits?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  base64Image?: Types.InputMaybe<Types.Scalars['String']['input']>;
  isPublic: Types.Scalars['Boolean']['input'];
  raceId: Types.RaceType;
  subraceName?: Types.InputMaybe<Types.Scalars['String']['input']>;
  charisma: Types.Scalars['Int']['input'];
  constitution: Types.Scalars['Int']['input'];
  dexterity: Types.Scalars['Int']['input'];
  intelligence: Types.Scalars['Int']['input'];
  strength: Types.Scalars['Int']['input'];
  wisdom: Types.Scalars['Int']['input'];
  copper: Types.Scalars['Int']['input'];
  gold: Types.Scalars['Int']['input'];
  platinum: Types.Scalars['Int']['input'];
  electrum: Types.Scalars['Int']['input'];
  silver: Types.Scalars['Int']['input'];
  inventory?: Types.InputMaybe<Array<Types.CreateInventoryItemDtoInput> | Types.CreateInventoryItemDtoInput>;
  raceTraitsAdjustments: Array<Types.KeyValuePairOfStringAndInt32Input> | Types.KeyValuePairOfStringAndInt32Input;
}>;


export type CreateCharacterMutation = { __typename?: 'Mutation', createCharacter: { __typename?: 'CreateCharacterPayload', uuid?: any | null } };
