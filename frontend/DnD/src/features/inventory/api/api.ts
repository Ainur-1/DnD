import { createApi } from "@reduxjs/toolkit/query/react";
import { UpdateInventoryItemMutationResult, UpdateInventoryItemMutationVariables } from "../model/types";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { client } from "@/shared/api";
import { GetCharacterInventoryQuery, GetCharacterInventoryQueryVariables } from "@/shared/api/gql/graphql";
import GetCharacterInventoryDocument from './queries/GetCharacterInventory.graphql';

export const inventoryApi = createApi({
    reducerPath: 'inventory/api',
    baseQuery: graphqlRequestBaseQuery({client: client}),
    tagTypes: ['InventoryItems'],
    endpoints: (build) => ({
        inventoryItems: build.query<GetCharacterInventoryQuery, GetCharacterInventoryQueryVariables>({
            query: (variables) => ({document: GetCharacterInventoryDocument, variables}),
            providesTags: ['InventoryItems']
        }),
        updateInventoryItem: build.mutation<UpdateInventoryItemMutationResult, UpdateInventoryItemMutationVariables>({
            query: (body) => ({
                url: " mutation",
                method: "Post",
                body
            }),
            invalidatesTags: ['InventoryItems']
        }),
    })
});

export const { useInventoryItemsQuery, useUpdateInventoryItemMutation } = inventoryApi;