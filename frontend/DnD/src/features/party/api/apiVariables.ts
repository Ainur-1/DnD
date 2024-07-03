export interface StrictPartyQueryResult {
    partyCharactersIds: string[],
    code: string,
}

export interface PartyQueryResult extends StrictPartyQueryResult {
    isUserGameMaster: boolean,
    userCharacterId: string | null,
}

export interface MyPartiesQueryResult {
    
}