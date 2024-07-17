import { createApi } from "@reduxjs/toolkit/query/react";
import { ClassInfoQuery, ClassInfoQueryVariables, ClassStartInventoryDescriptionQuery, ClassStartInventoryDescriptionQueryVariables, StrictClassesQuery } from "@/shared/api/gql/graphql";
import ClassStartInventoryDescriptionDocument from "./queries/ClassStartInventoryDesscriptionQuery.graphql";
import ClassInfoDocument from "./queries/ClassInfoQuery.graphql";
import StrictClassesDocument from "./queries/StrictClassesQuery.graphql";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { client } from "@/shared/api";

export const classApi = createApi({
    reducerPath: 'classes/api',
    baseQuery: graphqlRequestBaseQuery({client}),
    endpoints: (build) => ({
        strictClasses: build.query<StrictClassesQuery, void>({
            query: (variables) => ({document: StrictClassesDocument, variables}),
        }),
        classInfo: build.query<ClassInfoQuery, ClassInfoQueryVariables>({
            query: (variables) => ({document: ClassInfoDocument, variables}),
        }),
        classStartInventoryDescription: build.query<ClassStartInventoryDescriptionQuery, ClassStartInventoryDescriptionQueryVariables>({
            query: (variables) => ({document: ClassStartInventoryDescriptionDocument, variables}),
        }),
    })
});

export const { 
    useStrictClassesQuery, 
    useClassInfoQuery,
    useLazyClassInfoQuery,
    useClassStartInventoryDescriptionQuery,
} = classApi;