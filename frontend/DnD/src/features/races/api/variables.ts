import { IQueryOrMutationResultWithData } from "@/shared/types/IQueryOrMutationResult";
import { SimpleRace } from "../model/types";

export interface RaceNamesQueryResult extends IQueryOrMutationResultWithData<SimpleRace[]> {

}