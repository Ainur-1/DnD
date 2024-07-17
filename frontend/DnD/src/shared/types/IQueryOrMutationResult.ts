export interface IQueryOrMutationResult {
    success: boolean;
    error?: string;
}

export interface IQueryOrMutationResultWithData<TData> extends IQueryOrMutationResult {
    data?: TData;
}