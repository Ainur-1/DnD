export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  UUID: { input: any; output: any; }
};

export type AccessDeniedError = Error & {
  __typename?: 'AccessDeniedError';
  message: Scalars['String']['output'];
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum CharacterAlignmentType {
  Any = 'ANY',
  ChaoticEvil = 'CHAOTIC_EVIL',
  ChaoticGood = 'CHAOTIC_GOOD',
  ChaoticNeutral = 'CHAOTIC_NEUTRAL',
  LawfulEvil = 'LAWFUL_EVIL',
  LawfulGood = 'LAWFUL_GOOD',
  LawfulNeutral = 'LAWFUL_NEUTRAL',
  NeutralEvil = 'NEUTRAL_EVIL',
  NeutralGood = 'NEUTRAL_GOOD',
  TrueNeutral = 'TRUE_NEUTRAL',
  Unaligned = 'UNALIGNED'
}

export type CharacterAlignmentTypeOperationFilterInput = {
  eq?: InputMaybe<CharacterAlignmentType>;
  in?: InputMaybe<Array<CharacterAlignmentType>>;
  neq?: InputMaybe<CharacterAlignmentType>;
  nin?: InputMaybe<Array<CharacterAlignmentType>>;
};

export type CharacterDto = {
  __typename?: 'CharacterDto';
  dynamicStats: DynamicStatsDto;
  id: Scalars['UUID']['output'];
  isInParty: Scalars['Boolean']['output'];
  personality: CharacterPersonalityDto;
};

export type CharacterDtoFilterInput = {
  and?: InputMaybe<Array<CharacterDtoFilterInput>>;
  dynamicStats?: InputMaybe<DynamicStatsDtoFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isInParty?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CharacterDtoFilterInput>>;
  personality?: InputMaybe<CharacterPersonalityDtoFilterInput>;
};

export type CharacterPersonalityDto = {
  __typename?: 'CharacterPersonalityDto';
  age: Scalars['Int']['output'];
  alignment: CharacterAlignmentType;
  background: Scalars['String']['output'];
  base64Image?: Maybe<Scalars['String']['output']>;
  bonds: Array<Scalars['String']['output']>;
  class: ClassType;
  classFeatures: Array<ClassFeatureDto>;
  flaws: Array<Scalars['String']['output']>;
  languages: Array<Scalars['String']['output']>;
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  otherTraits: Array<Scalars['String']['output']>;
  race: Scalars['String']['output'];
  raceTraits: Array<RaceTrait>;
};

export type CharacterPersonalityDtoFilterInput = {
  age?: InputMaybe<IntOperationFilterInput>;
  alignment?: InputMaybe<CharacterAlignmentTypeOperationFilterInput>;
  and?: InputMaybe<Array<CharacterPersonalityDtoFilterInput>>;
  background?: InputMaybe<StringOperationFilterInput>;
  base64Image?: InputMaybe<StringOperationFilterInput>;
  bonds?: InputMaybe<ListStringOperationFilterInput>;
  class?: InputMaybe<ClassTypeOperationFilterInput>;
  classFeatures?: InputMaybe<ListFilterInputTypeOfClassFeatureDtoFilterInput>;
  flaws?: InputMaybe<ListStringOperationFilterInput>;
  languages?: InputMaybe<ListStringOperationFilterInput>;
  level?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CharacterPersonalityDtoFilterInput>>;
  otherTraits?: InputMaybe<ListStringOperationFilterInput>;
  race?: InputMaybe<StringOperationFilterInput>;
  raceTraits?: InputMaybe<ListFilterInputTypeOfRaceTraitFilterInput>;
};

export type ClassFeatureDto = {
  __typename?: 'ClassFeatureDto';
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ClassFeatureDtoFilterInput = {
  and?: InputMaybe<Array<ClassFeatureDtoFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ClassFeatureDtoFilterInput>>;
};

export enum ClassType {
  Barbarian = 'BARBARIAN',
  Bard = 'BARD',
  Cleric = 'CLERIC',
  Druid = 'DRUID',
  Fighter = 'FIGHTER',
  Monk = 'MONK',
  Paladin = 'PALADIN',
  Rogue = 'ROGUE',
  Sorcerer = 'SORCERER',
  Warlock = 'WARLOCK',
  Wizard = 'WIZARD'
}

export type ClassTypeOperationFilterInput = {
  eq?: InputMaybe<ClassType>;
  in?: InputMaybe<Array<ClassType>>;
  neq?: InputMaybe<ClassType>;
  nin?: InputMaybe<Array<ClassType>>;
};

export type CreatePartyInput = {
  accessCode: Scalars['String']['input'];
};

export type CreatePartyPayload = {
  __typename?: 'CreatePartyPayload';
  uuid?: Maybe<Scalars['UUID']['output']>;
};

export type DeathSavesDto = {
  __typename?: 'DeathSavesDto';
  failureCount: Scalars['Int']['output'];
  successCount: Scalars['Int']['output'];
};

export type DeathSavesDtoFilterInput = {
  and?: InputMaybe<Array<DeathSavesDtoFilterInput>>;
  failureCount?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<DeathSavesDtoFilterInput>>;
  successCount?: InputMaybe<IntOperationFilterInput>;
};

export type DynamicStatsDto = {
  __typename?: 'DynamicStatsDto';
  armorClass: Scalars['Int']['output'];
  deathSaves?: Maybe<DeathSavesDto>;
  hitDicesLeftCount: Scalars['Int']['output'];
  hp: Scalars['Int']['output'];
  initiative: Scalars['Int']['output'];
  inspiration: Scalars['Int']['output'];
  isDead: Scalars['Boolean']['output'];
  isDying: Scalars['Boolean']['output'];
  proficiency: Scalars['Int']['output'];
  speed: Scalars['Int']['output'];
  tempHp: Scalars['Int']['output'];
};

export type DynamicStatsDtoFilterInput = {
  and?: InputMaybe<Array<DynamicStatsDtoFilterInput>>;
  armorClass?: InputMaybe<IntOperationFilterInput>;
  deathSaves?: InputMaybe<DeathSavesDtoFilterInput>;
  hitDicesLeftCount?: InputMaybe<IntOperationFilterInput>;
  hp?: InputMaybe<IntOperationFilterInput>;
  initiative?: InputMaybe<IntOperationFilterInput>;
  inspiration?: InputMaybe<IntOperationFilterInput>;
  isDead?: InputMaybe<BooleanOperationFilterInput>;
  isDying?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<DynamicStatsDtoFilterInput>>;
  proficiency?: InputMaybe<IntOperationFilterInput>;
  speed?: InputMaybe<IntOperationFilterInput>;
  tempHp?: InputMaybe<IntOperationFilterInput>;
};

export type Error = {
  message: Scalars['String']['output'];
};

export type FieldNameTakenError = Error & {
  __typename?: 'FieldNameTakenError';
  message: Scalars['String']['output'];
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type InvalidArgumentValueError = Error & {
  __typename?: 'InvalidArgumentValueError';
  message: Scalars['String']['output'];
};

export type JoinPartyInput = {
  accessCode: Scalars['String']['input'];
  characterId: Scalars['UUID']['input'];
  partyId: Scalars['UUID']['input'];
};

export type JoinPartyPayload = {
  __typename?: 'JoinPartyPayload';
  userPartyDto?: Maybe<UserPartyDto>;
};

export type ListFilterInputTypeOfClassFeatureDtoFilterInput = {
  all?: InputMaybe<ClassFeatureDtoFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ClassFeatureDtoFilterInput>;
  some?: InputMaybe<ClassFeatureDtoFilterInput>;
};

export type ListFilterInputTypeOfRaceTraitFilterInput = {
  all?: InputMaybe<RaceTraitFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RaceTraitFilterInput>;
  some?: InputMaybe<RaceTraitFilterInput>;
};

export type ListStringOperationFilterInput = {
  all?: InputMaybe<StringOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StringOperationFilterInput>;
  some?: InputMaybe<StringOperationFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createParty: CreatePartyPayload;
  joinParty: JoinPartyPayload;
  signIn: SignInPayload;
  signOut: SignOutPayload;
  signUp: SignUpPayload;
};


export type MutationCreatePartyArgs = {
  input: CreatePartyInput;
};


export type MutationJoinPartyArgs = {
  input: JoinPartyInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type ObjectNotFoundError = Error & {
  __typename?: 'ObjectNotFoundError';
  message: Scalars['String']['output'];
};

export type PartyCharacterDto = {
  __typename?: 'PartyCharacterDto';
  characterName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
};

export type Query = {
  __typename?: 'Query';
  character: CharacterDto;
  myCharacters: Array<CharacterDto>;
  myParties: Array<UserPartyDto>;
  party: UserPartyDto;
};


export type QueryCharacterArgs = {
  characterId: Scalars['UUID']['input'];
};


export type QueryMyCharactersArgs = {
  where?: InputMaybe<CharacterDtoFilterInput>;
};


export type QueryPartyArgs = {
  partyId: Scalars['UUID']['input'];
};

export type RaceTrait = {
  __typename?: 'RaceTrait';
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type RaceTraitFilterInput = {
  and?: InputMaybe<Array<RaceTraitFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RaceTraitFilterInput>>;
};

export type SignInInput = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe: Scalars['Boolean']['input'];
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  uuid?: Maybe<Scalars['UUID']['output']>;
};

export type SignOutPayload = {
  __typename?: 'SignOutPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
};

export type SignUpError = FieldNameTakenError | InvalidArgumentValueError;

export type SignUpInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
  errors?: Maybe<Array<SignUpError>>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UserPartyDto = {
  __typename?: 'UserPartyDto';
  accessCode: Scalars['String']['output'];
  gameMasterId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  inGameCharacter?: Maybe<PartyCharacterDto>;
  inGameCharactersIds: Array<Scalars['UUID']['output']>;
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  ngt?: InputMaybe<Scalars['UUID']['input']>;
  ngte?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nlt?: InputMaybe<Scalars['UUID']['input']>;
  nlte?: InputMaybe<Scalars['UUID']['input']>;
};

export type SignInMutationVariables = Exact<{
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe: Scalars['Boolean']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInPayload', uuid?: any | null } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: { __typename?: 'SignOutPayload', boolean?: boolean | null } };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpPayload', boolean?: boolean | null, errors?: Array<{ __typename?: 'FieldNameTakenError', message: string } | { __typename?: 'InvalidArgumentValueError', message: string }> | null } };

export type CharacterDeathSavesQueryVariables = Exact<{
  characterId: Scalars['UUID']['input'];
}>;


export type CharacterDeathSavesQuery = { __typename?: 'Query', character: { __typename?: 'CharacterDto', dynamicStats: { __typename?: 'DynamicStatsDto', isDying: boolean, isDead: boolean, deathSaves?: { __typename?: 'DeathSavesDto', failureCount: number, successCount: number } | null } } };

export type MyAliveCharactersQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAliveCharactersQuery = { __typename?: 'Query', myCharacters: Array<{ __typename?: 'CharacterDto', id: any, personality: { __typename?: 'CharacterPersonalityDto', name: string, base64Image?: string | null } }> };

export type CreatePartyMutationVariables = Exact<{
  accessCode: Scalars['String']['input'];
}>;


export type CreatePartyMutation = { __typename?: 'Mutation', createParty: { __typename?: 'CreatePartyPayload', uuid?: any | null } };

export type JoinPartyMutationVariables = Exact<{
  accessCode: Scalars['String']['input'];
  characterId: Scalars['UUID']['input'];
  partyId: Scalars['UUID']['input'];
}>;


export type JoinPartyMutation = { __typename?: 'Mutation', joinParty: { __typename?: 'JoinPartyPayload', userPartyDto?: { __typename?: 'UserPartyDto', id: any } | null } };

export type UserPartiesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserPartiesQuery = { __typename?: 'Query', myParties: Array<{ __typename?: 'UserPartyDto', accessCode: string, gameMasterId: any, id: any, inGameCharacter?: { __typename?: 'PartyCharacterDto', characterName: string } | null }> };

export type UserPartyInfoQueryVariables = Exact<{
  partyId: Scalars['UUID']['input'];
}>;


export type UserPartyInfoQuery = { __typename?: 'Query', party: { __typename?: 'UserPartyDto', accessCode: string, gameMasterId: any, inGameCharactersIds: Array<any>, inGameCharacter?: { __typename?: 'PartyCharacterDto', characterName: string, id: any } | null } };
