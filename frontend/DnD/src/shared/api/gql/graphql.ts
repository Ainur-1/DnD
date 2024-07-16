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
  Decimal: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AbilityBuff = {
  __typename?: 'AbilityBuff';
  abilityType: CharacterAbilityType;
  buffValue: Scalars['Int']['output'];
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

export type Armor = {
  __typename?: 'Armor';
  armorType: ArmorType;
  baseArmorClass: Scalars['Int']['output'];
  calculateArmorClass: Scalars['Int']['output'];
  calculateSpeedExpenses: Scalars['Int']['output'];
  costInGold: Scalars['Decimal']['output'];
  description?: Maybe<Scalars['String']['output']>;
  hasStealthDisadvantage: Scalars['Boolean']['output'];
  iconUrl?: Maybe<Scalars['String']['output']>;
  material: Scalars['String']['output'];
  maxPossibleDexterityModifier?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  requiredStrength?: Maybe<Scalars['Int']['output']>;
  tags: Array<Scalars['String']['output']>;
  weightInPounds: Scalars['Float']['output'];
};


export type ArmorCalculateArmorClassArgs = {
  characterDexterityModifier: Scalars['Int']['input'];
};


export type ArmorCalculateSpeedExpensesArgs = {
  characterStrength: Scalars['Int']['input'];
};

export type ArmorInput = {
  armorType: ArmorType;
  baseArmorClass: Scalars['Int']['input'];
  costInGold: Scalars['Decimal']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  hasStealthDisadvantage: Scalars['Boolean']['input'];
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  material: Scalars['String']['input'];
  maxPossibleDexterityModifier?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  requiredStrength?: InputMaybe<Scalars['Int']['input']>;
  tags: Array<Scalars['String']['input']>;
  weightInPounds: Scalars['Float']['input'];
};

export enum ArmorType {
  Heavy = 'HEAVY',
  Light = 'LIGHT',
  Medium = 'MEDIUM',
  Shield = 'SHIELD'
}

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type ChangePasswordPayload = {
  __typename?: 'ChangePasswordPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
};

export enum CharacterAbilityType {
  Charisma = 'CHARISMA',
  Constitution = 'CONSTITUTION',
  Dexterity = 'DEXTERITY',
  Intelligence = 'INTELLIGENCE',
  Strength = 'STRENGTH',
  Wisdom = 'WISDOM'
}

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
  dynamicStats?: Maybe<DynamicStatsDto>;
  id: Scalars['UUID']['output'];
  isDead: Scalars['Boolean']['output'];
  isInParty: Scalars['Boolean']['output'];
  personality: CharacterPersonalityDto;
};

export type CharacterDtoFilterInput = {
  and?: InputMaybe<Array<CharacterDtoFilterInput>>;
  dynamicStats?: InputMaybe<DynamicStatsDtoFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isDead?: InputMaybe<BooleanOperationFilterInput>;
  isInParty?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CharacterDtoFilterInput>>;
  personality?: InputMaybe<CharacterPersonalityDtoFilterInput>;
};

export type CharacterInventoryDto = {
  __typename?: 'CharacterInventoryDto';
  items: Array<InventoryItemDto>;
  totalWeightInPounds: Scalars['Float']['output'];
  wallet: WalletDto;
};

export type CharacterPersonalityDto = {
  __typename?: 'CharacterPersonalityDto';
  age: Scalars['Int']['output'];
  alignment: CharacterAlignmentType;
  background: Scalars['String']['output'];
  base64Image?: Maybe<Scalars['String']['output']>;
  bonds: Array<Scalars['String']['output']>;
  canLevelUp: Scalars['Boolean']['output'];
  class: Scalars['String']['output'];
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
  canLevelUp?: InputMaybe<BooleanOperationFilterInput>;
  class?: InputMaybe<StringOperationFilterInput>;
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

export enum CharacterSkillType {
  Acrobatics = 'ACROBATICS',
  AnimalHanding = 'ANIMAL_HANDING',
  Arcana = 'ARCANA',
  Athletics = 'ATHLETICS',
  Deception = 'DECEPTION',
  HandSleight = 'HAND_SLEIGHT',
  History = 'HISTORY',
  Insight = 'INSIGHT',
  Intimidation = 'INTIMIDATION',
  Investigation = 'INVESTIGATION',
  Medicine = 'MEDICINE',
  Nature = 'NATURE',
  Perception = 'PERCEPTION',
  Performance = 'PERFORMANCE',
  Persuasion = 'PERSUASION',
  Religion = 'RELIGION',
  Stealth = 'STEALTH',
  Survival = 'SURVIVAL'
}

export type Class = {
  __typename?: 'Class';
  armorProficiency: Array<ArmorType>;
  classFeatures: Array<ClassFeature>;
  description: Scalars['String']['output'];
  hitDice: Dice;
  id: ClassType;
  name: Scalars['String']['output'];
  savingThrowsTraitsMastery: Array<CharacterAbilityType>;
  skillMasteryToChooseCount: Scalars['Int']['output'];
  skillTraitsMastery: Array<CharacterSkillType>;
  startInventoryDescription: Scalars['String']['output'];
  weaponProficiency: Array<Scalars['String']['output']>;
};

export type ClassFeature = {
  __typename?: 'ClassFeature';
  classFeatureMastery?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  minCharacterRequiredLevel: Scalars['Int']['output'];
  name: Scalars['String']['output'];
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
  Ranger = 'RANGER',
  Rogue = 'ROGUE',
  Sorcerer = 'SORCERER',
  Warlock = 'WARLOCK',
  Wizard = 'WIZARD'
}

export type CreateCharacterDtoInput = {
  age: Scalars['Int']['input'];
  alignment: CharacterAlignmentType;
  charisma: Scalars['Int']['input'];
  class: ClassType;
  coinsAffectOnWeight: Scalars['Boolean']['input'];
  constitution: Scalars['Int']['input'];
  dexterity: Scalars['Int']['input'];
  intelligence: Scalars['Int']['input'];
  isPublic: Scalars['Boolean']['input'];
  maybeBackground?: InputMaybe<Scalars['String']['input']>;
  maybeBase64Image?: InputMaybe<Scalars['String']['input']>;
  maybeBonds?: InputMaybe<Array<Scalars['String']['input']>>;
  maybeFlaws?: InputMaybe<Array<Scalars['String']['input']>>;
  maybeLanguages?: InputMaybe<Array<Scalars['String']['input']>>;
  maybeName?: InputMaybe<Scalars['String']['input']>;
  maybeOtherTraits?: InputMaybe<Array<Scalars['String']['input']>>;
  maybeStartInventory?: InputMaybe<Array<CreateInventoryItemDtoInput>>;
  maybeSubrace?: InputMaybe<Scalars['String']['input']>;
  race: RaceType;
  raceTraitsAdjustments: Array<KeyValuePairOfStringAndInt32Input>;
  skillTraits: Array<CharacterSkillType>;
  speed: Scalars['Int']['input'];
  startWealth: StartWealthDtoInput;
  strength: Scalars['Int']['input'];
  wisdom: Scalars['Int']['input'];
  xp: Scalars['Int']['input'];
};

export type CreateCharacterInput = {
  character: CreateCharacterDtoInput;
};

export type CreateCharacterPayload = {
  __typename?: 'CreateCharacterPayload';
  uuid?: Maybe<Scalars['UUID']['output']>;
};

export type CreateInventoryItemDtoInput = {
  count: Scalars['Int']['input'];
  inUse: Scalars['Boolean']['input'];
  isItemProficiencyOn: Scalars['Boolean']['input'];
  maybeArmor?: InputMaybe<ArmorInput>;
  maybeStuff?: InputMaybe<StuffInput>;
  maybeWeapon?: InputMaybe<WeaponInput>;
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

export enum Dice {
  OneD1 = 'ONE_D1',
  OneD2 = 'ONE_D2',
  OneD3 = 'ONE_D3',
  OneD4 = 'ONE_D4',
  OneD6 = 'ONE_D6',
  OneD8 = 'ONE_D8',
  OneD10 = 'ONE_D10',
  OneD12 = 'ONE_D12',
  TwoD6 = 'TWO_D6',
  TwoD10 = 'TWO_D10'
}

export type DynamicStatsDto = {
  __typename?: 'DynamicStatsDto';
  armorClass: Scalars['Int']['output'];
  deathSaves?: Maybe<DeathSavesDto>;
  hitDicesLeftCount: Scalars['Int']['output'];
  hp: Scalars['Int']['output'];
  inspiration: Scalars['Int']['output'];
  isDead: Scalars['Boolean']['output'];
  isDying: Scalars['Boolean']['output'];
  speed: Scalars['Int']['output'];
  tempHp: Scalars['Int']['output'];
};

export type DynamicStatsDtoFilterInput = {
  and?: InputMaybe<Array<DynamicStatsDtoFilterInput>>;
  armorClass?: InputMaybe<IntOperationFilterInput>;
  deathSaves?: InputMaybe<DeathSavesDtoFilterInput>;
  hitDicesLeftCount?: InputMaybe<IntOperationFilterInput>;
  hp?: InputMaybe<IntOperationFilterInput>;
  inspiration?: InputMaybe<IntOperationFilterInput>;
  isDead?: InputMaybe<BooleanOperationFilterInput>;
  isDying?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<DynamicStatsDtoFilterInput>>;
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

export type InventoryItemDto = {
  __typename?: 'InventoryItemDto';
  count: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  inUse: Scalars['Boolean']['output'];
  isItemProficiencyOn: Scalars['Boolean']['output'];
  item: OneOfItem;
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

export type KeyValuePairOfStringAndInt32Input = {
  key: Scalars['String']['input'];
  value: Scalars['Int']['input'];
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
  changePassword: ChangePasswordPayload;
  createCharacter: CreateCharacterPayload;
  createParty: CreatePartyPayload;
  joinParty: JoinPartyPayload;
  requestPasswordReset: RequestPasswordResetPayload;
  resetPassword: ResetPasswordPayload;
  signIn: SignInPayload;
  signOut: SignOutPayload;
  signUp: SignUpPayload;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreateCharacterArgs = {
  input: CreateCharacterInput;
};


export type MutationCreatePartyArgs = {
  input: CreatePartyInput;
};


export type MutationJoinPartyArgs = {
  input: JoinPartyInput;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
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

export type OneOfItem = {
  __typename?: 'OneOfItem';
  armor?: Maybe<Armor>;
  stuff?: Maybe<Stuff>;
  weapon?: Maybe<Weapon>;
};

export type PartyCharacterDto = {
  __typename?: 'PartyCharacterDto';
  characterName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
};

export type Query = {
  __typename?: 'Query';
  character: CharacterDto;
  characterInventory: CharacterInventoryDto;
  classInfo: Class;
  classes: Array<Class>;
  myCharacters: Array<CharacterDto>;
  myParties: Array<UserPartyDto>;
  party: UserPartyDto;
  raceInfo: Race;
  races: Array<Race>;
};


export type QueryCharacterArgs = {
  characterId: Scalars['UUID']['input'];
};


export type QueryCharacterInventoryArgs = {
  characterId: Scalars['UUID']['input'];
};


export type QueryClassInfoArgs = {
  id: ClassType;
};


export type QueryMyCharactersArgs = {
  where?: InputMaybe<CharacterDtoFilterInput>;
};


export type QueryPartyArgs = {
  partyId: Scalars['UUID']['input'];
};


export type QueryRaceInfoArgs = {
  id: RaceType;
};

export type Race = {
  __typename?: 'Race';
  abilities: Array<AbilityBuff>;
  adultAge: Scalars['Int']['output'];
  hasSubraces: Scalars['Boolean']['output'];
  id: RaceType;
  languages: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  raceTraits: Array<RaceTraitDescriptor>;
  recommendedAlignmentDescription: Scalars['String']['output'];
  size: Size;
  speed: Scalars['Int']['output'];
  subRaceInfo?: Maybe<SubRaceInfo>;
  subRacesAdjustments: Array<SubRaceInfo>;
};


export type RaceSubRaceInfoArgs = {
  subRaceName: Scalars['String']['input'];
};

export type RaceTrait = {
  __typename?: 'RaceTrait';
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type RaceTraitDescriptor = {
  __typename?: 'RaceTraitDescriptor';
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
};

export type RaceTraitFilterInput = {
  and?: InputMaybe<Array<RaceTraitFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RaceTraitFilterInput>>;
};

export enum RaceType {
  Dragonborn = 'DRAGONBORN',
  Dwarf = 'DWARF',
  Elf = 'ELF',
  Gnome = 'GNOME',
  Halfling = 'HALFLING',
  HalfElf = 'HALF_ELF',
  HalfOrc = 'HALF_ORC',
  Human = 'HUMAN',
  Tiefling = 'TIEFLING'
}

export type RequestPasswordResetInput = {
  email: Scalars['String']['input'];
};

export type RequestPasswordResetPayload = {
  __typename?: 'RequestPasswordResetPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
};

export type ResetPasswordInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
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

export enum Size {
  Big = 'BIG',
  Medium = 'MEDIUM',
  Small = 'SMALL'
}

export type StartWealthDtoInput = {
  copperCoins: Scalars['Int']['input'];
  electrumCoins: Scalars['Int']['input'];
  goldCoins: Scalars['Int']['input'];
  platinumCoins: Scalars['Int']['input'];
  silverCoins: Scalars['Int']['input'];
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

export type Stuff = {
  __typename?: 'Stuff';
  costInGold: Scalars['Decimal']['output'];
  description?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  weightInPounds: Scalars['Float']['output'];
};

export type StuffInput = {
  costInGold: Scalars['Decimal']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  weightInPounds: Scalars['Float']['input'];
};

export type SubRaceInfo = {
  __typename?: 'SubRaceInfo';
  abilities: Array<AbilityBuff>;
  name: Scalars['String']['output'];
  raceTraits: Array<RaceTraitDescriptor>;
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

export type WalletDto = {
  __typename?: 'WalletDto';
  copper: Scalars['Int']['output'];
  electrum: Scalars['Int']['output'];
  gold: Scalars['Int']['output'];
  platinum: Scalars['Int']['output'];
  silver: Scalars['Int']['output'];
};

export type Weapon = {
  __typename?: 'Weapon';
  alternateHitDice?: Maybe<Dice>;
  attackType: WeaponAttackType;
  costInGold: Scalars['Decimal']['output'];
  criticalDistanceInFoots?: Maybe<Scalars['Int']['output']>;
  damageType: WeaponDamageType;
  description?: Maybe<Scalars['String']['output']>;
  hitDice: Dice;
  iconUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  normalDistanceInFoots?: Maybe<Scalars['Int']['output']>;
  proficiencyType: WeaponProficiencyType;
  properties?: Maybe<Array<WeaponProperty>>;
  tags: Array<Scalars['String']['output']>;
  weightInPounds: Scalars['Float']['output'];
};

export enum WeaponAttackType {
  Bludgeoning = 'BLUDGEONING',
  Piercing = 'PIERCING',
  Slashing = 'SLASHING'
}

export enum WeaponDamageType {
  Melee = 'MELEE',
  Ranged = 'RANGED'
}

export type WeaponInput = {
  alternateHitDice?: InputMaybe<Dice>;
  attackType: WeaponAttackType;
  costInGold: Scalars['Decimal']['input'];
  criticalDistanceInFoots?: InputMaybe<Scalars['Int']['input']>;
  damageType: WeaponDamageType;
  description?: InputMaybe<Scalars['String']['input']>;
  hitDice: Dice;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  normalDistanceInFoots?: InputMaybe<Scalars['Int']['input']>;
  proficiencyType: WeaponProficiencyType;
  properties?: InputMaybe<Array<WeaponProperty>>;
  tags: Array<Scalars['String']['input']>;
  weightInPounds: Scalars['Float']['input'];
};

export enum WeaponProficiencyType {
  Martial = 'MARTIAL',
  Simple = 'SIMPLE'
}

export enum WeaponProperty {
  Ammunition = 'AMMUNITION',
  Finesse = 'FINESSE',
  Heavy = 'HEAVY',
  Light = 'LIGHT',
  Loading = 'LOADING',
  Range = 'RANGE',
  Reach = 'REACH',
  Special = 'SPECIAL',
  Thrown = 'THROWN',
  TwoHanded = 'TWO_HANDED',
  Versatile = 'VERSATILE'
}

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

export type CarouselCharactersQueryVariables = Exact<{ [key: string]: never; }>;


export type CarouselCharactersQuery = { __typename?: 'Query', myCharacters: Array<{ __typename?: 'CharacterDto', id: any, isInParty: boolean, isDead: boolean, personality: { __typename?: 'CharacterPersonalityDto', name: string, race: string, class: string, level: number, base64Image?: string | null, canLevelUp: boolean } }> };

export type CharacterDeathSavesQueryVariables = Exact<{
  characterId: Scalars['UUID']['input'];
}>;


export type CharacterDeathSavesQuery = { __typename?: 'Query', character: { __typename?: 'CharacterDto', dynamicStats?: { __typename?: 'DynamicStatsDto', isDying: boolean, isDead: boolean, deathSaves?: { __typename?: 'DeathSavesDto', failureCount: number, successCount: number } | null } | null } };

export type CreateCharacterMutationVariables = Exact<{
  age: Scalars['Int']['input'];
  alignment: CharacterAlignmentType;
  charisma: Scalars['Int']['input'];
  classId: ClassType;
  coinsAffectOnWeight: Scalars['Boolean']['input'];
  constitution: Scalars['Int']['input'];
  dexterity: Scalars['Int']['input'];
  intelligence: Scalars['Int']['input'];
  isPublic: Scalars['Boolean']['input'];
  background?: InputMaybe<Scalars['String']['input']>;
  base64Image?: InputMaybe<Scalars['String']['input']>;
  bonds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  flaws?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  languages?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  otherTraits?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  inventory?: InputMaybe<Array<CreateInventoryItemDtoInput> | CreateInventoryItemDtoInput>;
  race: RaceType;
  subrace?: InputMaybe<Scalars['String']['input']>;
  raceTraitsAdjustments: Array<KeyValuePairOfStringAndInt32Input> | KeyValuePairOfStringAndInt32Input;
  speed: Scalars['Int']['input'];
  wallet: StartWealthDtoInput;
  strength: Scalars['Int']['input'];
  wisdom: Scalars['Int']['input'];
  xp: Scalars['Int']['input'];
  selectedSkillTraits: Array<CharacterSkillType> | CharacterSkillType;
}>;


export type CreateCharacterMutation = { __typename?: 'Mutation', createCharacter: { __typename?: 'CreateCharacterPayload', uuid?: any | null } };

export type MyAliveCharactersQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAliveCharactersQuery = { __typename?: 'Query', myCharacters: Array<{ __typename?: 'CharacterDto', id: any, personality: { __typename?: 'CharacterPersonalityDto', name: string, base64Image?: string | null } }> };

export type ClassInfoQueryVariables = Exact<{
  id: ClassType;
}>;


export type ClassInfoQuery = { __typename?: 'Query', classInfo: { __typename?: 'Class', armorProficiency: Array<ArmorType>, description: string, hitDice: Dice, id: ClassType, name: string, savingThrowsTraitsMastery: Array<CharacterAbilityType>, skillMasteryToChooseCount: number, skillTraitsMastery: Array<CharacterSkillType>, startInventoryDescription: string, weaponProficiency: Array<string> } };

export type ClassStartInventoryDescriptionQueryVariables = Exact<{
  id: ClassType;
}>;


export type ClassStartInventoryDescriptionQuery = { __typename?: 'Query', classInfo: { __typename?: 'Class', startInventoryDescription: string } };

export type StrictClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type StrictClassesQuery = { __typename?: 'Query', classes: Array<{ __typename?: 'Class', id: ClassType, name: string }> };

export type GetCharacterInventoryQueryVariables = Exact<{
  characterId: Scalars['UUID']['input'];
}>;


export type GetCharacterInventoryQuery = { __typename?: 'Query', characterInventory: { __typename?: 'CharacterInventoryDto', items: Array<{ __typename?: 'InventoryItemDto', count: number, id: any, inUse: boolean, isItemProficiencyOn: boolean, item: { __typename?: 'OneOfItem', armor?: { __typename?: 'Armor', armorType: ArmorType, baseArmorClass: number, costInGold: any, description?: string | null, hasStealthDisadvantage: boolean, iconUrl?: string | null, material: string, maxPossibleDexterityModifier?: number | null, name: string, requiredStrength?: number | null, tags: Array<string>, weightInPounds: number } | null, stuff?: { __typename?: 'Stuff', costInGold: any, description?: string | null, iconUrl?: string | null, name: string, tags: Array<string>, weightInPounds: number } | null, weapon?: { __typename?: 'Weapon', alternateHitDice?: Dice | null, attackType: WeaponAttackType, costInGold: any, criticalDistanceInFoots?: number | null, damageType: WeaponDamageType, description?: string | null, hitDice: Dice, iconUrl?: string | null, name: string, normalDistanceInFoots?: number | null, proficiencyType: WeaponProficiencyType, properties?: Array<WeaponProperty> | null, tags: Array<string>, weightInPounds: number } | null } }> } };

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


export type UserPartyInfoQuery = { __typename?: 'Query', party: { __typename?: 'UserPartyDto', accessCode: string, gameMasterId: any, id: any, inGameCharactersIds: Array<any>, inGameCharacter?: { __typename?: 'PartyCharacterDto', characterName: string, id: any } | null } };

export type GetRaceQueryVariables = Exact<{
  raceId: RaceType;
}>;


export type GetRaceQuery = { __typename?: 'Query', raceInfo: { __typename?: 'Race', adultAge: number, id: RaceType, languages: Array<string>, name: string, recommendedAlignmentDescription: string, size: Size, speed: number, raceTraits: Array<{ __typename?: 'RaceTraitDescriptor', description: string, name: string, options?: Array<string> | null }>, subRacesAdjustments: Array<{ __typename?: 'SubRaceInfo', name: string, abilities: Array<{ __typename?: 'AbilityBuff', abilityType: CharacterAbilityType, buffValue: number }>, raceTraits: Array<{ __typename?: 'RaceTraitDescriptor', description: string, name: string, options?: Array<string> | null }> }>, abilities: Array<{ __typename?: 'AbilityBuff', abilityType: CharacterAbilityType, buffValue: number }> } };

export type GetRacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRacesQuery = { __typename?: 'Query', races: Array<{ __typename?: 'Race', id: RaceType, name: string, subRacesAdjustments: Array<{ __typename?: 'SubRaceInfo', name: string }> }> };
