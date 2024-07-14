import * as Types from '../../../../shared/api/gql/graphql';

export type CreateCharacterMutationVariables = Types.Exact<{
  age: Types.Scalars['Int']['input'];
  alignment: Types.CharacterAlignmentType;
  charisma: Types.Scalars['Int']['input'];
  classId: Types.ClassType;
  coinsAffectOnWeight: Types.Scalars['Boolean']['input'];
  constitution: Types.Scalars['Int']['input'];
  dexterity: Types.Scalars['Int']['input'];
  intelligence: Types.Scalars['Int']['input'];
  isPublic: Types.Scalars['Boolean']['input'];
  background?: Types.InputMaybe<Types.Scalars['String']['input']>;
  base64Image?: Types.InputMaybe<Types.Scalars['String']['input']>;
  bonds?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  flaws?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  languages?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  otherTraits?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  inventory?: Types.InputMaybe<Array<Types.CreateInventoryItemDtoInput> | Types.CreateInventoryItemDtoInput>;
  race: Types.RaceType;
  subrace?: Types.InputMaybe<Types.Scalars['String']['input']>;
  raceTraitsAdjustments: Array<Types.KeyValuePairOfStringAndInt32Input> | Types.KeyValuePairOfStringAndInt32Input;
  speed: Types.Scalars['Int']['input'];
  wallet: Types.StartWealthDtoInput;
  strength: Types.Scalars['Int']['input'];
  wisdom: Types.Scalars['Int']['input'];
  xp: Types.Scalars['Int']['input'];
  selectedSkillTraits: Array<Types.CharacterSkillType> | Types.CharacterSkillType;
}>;


export type CreateCharacterMutation = { __typename?: 'Mutation', createCharacter: { __typename?: 'CreateCharacterPayload', uuid?: any | null } };
