import { BASE_URL } from "@/shared/configuration/enviromentConstants";
import { GraphQLClient } from "graphql-request";

export const grapqhQlClient = new GraphQLClient(BASE_URL, {
    credentials: 'include',
});