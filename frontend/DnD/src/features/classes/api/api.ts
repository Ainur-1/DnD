import { BASE_URL } from "@/shared/configuration/enviromentConstants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ClassNamesQueryResult } from "./variables";

export const classApi = createApi({
    reducerPath: 'classes/api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        strictClasses: build.query<ClassNamesQueryResult, void>({
            query: (body) => ({
                url: "geta ll classes",
                method: "POST",
                body
            }),
        }),
    })
});

export const { 
    useStrictClassesQuery, 
} = classApi;