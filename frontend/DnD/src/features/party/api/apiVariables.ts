import { IQueryOrMutationResult, IQueryOrMutationResultWithData } from "@/shared/types/IQueryOrMutationResult"

export interface StrictPartyQueryResult {
    partyCharactersIds: string[],
    code: string,
    id: string
}

export interface PartyQueryResult extends StrictPartyQueryResult {
    isUserGameMaster: boolean,
    userCharacterId: string | null,
}

export interface CreatePartyVariables {
    accessCode: string,
}

export interface CreatePartyResult extends IQueryOrMutationResultWithData<{
    partyId: string
}> {
}

export interface JoinPartyVariables extends CreatePartyVariables {
    partyId: string,
}

export interface JoinPartyResult extends IQueryOrMutationResult {
}
