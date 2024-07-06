import { RaceInfo, SimpleRace } from "@/entities/races/model/type";
import { IQueryOrMutationResultWithData } from "@/shared/types/IQueryOrMutationResult";


export interface RaceNamesQueryResult extends IQueryOrMutationResultWithData<SimpleRace[]> {

}

export interface RaceNamesInfoQueryResult extends IQueryOrMutationResultWithData<RaceInfo> {

}