export interface SignInMutationResult  {

}

export interface SignInMutationVariables {
    login: string;
    password: string;
    persistSession: boolean;
}

export interface SignUpMutationResult  {

}

export interface SignUpMutationVariables {
    email: string;
    username: string;
    name: string | null;
    password: string;
}