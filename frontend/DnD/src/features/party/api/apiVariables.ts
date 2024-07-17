import { IQueryOrMutationResult, IQueryOrMutationResultWithData } from "@/shared/types/IQueryOrMutationResult"

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
