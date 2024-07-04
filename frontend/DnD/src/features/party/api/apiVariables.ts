export interface StrictPartyQueryResult {
    partyCharactersIds: string[],
    code: string,
    id: string
}

export interface PartyQueryResult extends StrictPartyQueryResult {
    isUserGameMaster: boolean,
    userCharacterId: string | null,
}

export interface MyPartiesQueryResult {
    parties: PartyQueryResult[]
}