import { BASE_URL } from "@/shared/configuration/enviromentConstants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UpdateInventoryItemMutationResult, UpdateInventoryItemMutationVariables, InventoryItemsQueryResult, InventoryItemsQueryVariables } from "../model/types";

export const inventoryApi = createApi({
    reducerPath: 'inventory/api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        inventoryItems: build.query<InventoryItemsQueryResult, InventoryItemsQueryVariables>({
            query: (body) => ({
                url: " mutation",
                method: "GET",
                body
            }),
        }),
        updateInventoryItem: build.mutation<UpdateInventoryItemMutationResult, UpdateInventoryItemMutationVariables>({
            query: (body) => ({
                url: " mutation",
                method: "Post",
                body
            }),
        }),
    })
});

export const { useInventoryItemsQuery, useUpdateInventoryItemMutation } = inventoryApi;