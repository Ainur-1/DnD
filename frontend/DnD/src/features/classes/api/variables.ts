import { SimpleClass } from "@/entities/classes";
import { IQueryOrMutationResultWithData } from "@/shared/types/IQueryOrMutationResult";

export interface ClassNamesQueryResult extends IQueryOrMutationResultWithData<SimpleClass[]> {

}
