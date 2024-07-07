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

export type Error = {
  message: Scalars['String']['output'];
};

export type FieldNameTakenError = Error & {
  __typename?: 'FieldNameTakenError';
  message: Scalars['String']['output'];
};

export type InvalidArgumentValueError = Error & {
  __typename?: 'InvalidArgumentValueError';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn: SignInPayload;
  signOut: SignOutPayload;
  signUp: SignUpPayload;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  usernameAsync: Scalars['String']['output'];
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
