import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  IMainResponse,
  IProcessResponse,
  IRequestPostCard,
  IRequestStartAnalysis,
  IRequestStartDescription,
  IResponseCard,
  IResponseStartAnalysis,
  IResponseStartDescription,
  ICardAnalysisResponse,
  ICardDescriptionResponse,
  IArchiveResponse,
} from "../types";
import { axiosBaseQuery } from "@/axios/axiosBaseQuery";

const BASE_URL = "https://api.stage.seo-ai.kz/c";

export const mainApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Archive", "Process"], // Add tag types for cache invalidation
  endpoints: (builder) => ({
    getMainInfo: builder.query<IMainResponse, void>({
      query: () => ({
        url: "/v2/main",
        method: "GET",
      }),
    }),
    postCard: builder.mutation<IResponseCard, IRequestPostCard>({
      query: (body) => ({
        url: "/v2/static/card",
        method: "POST",
        data: body,
      }),
    }),
    startAnalysis: builder.mutation<
      IResponseStartAnalysis,
      IRequestStartAnalysis
    >({
      query: (body) => ({
        url: "/v2/static/card/analyse",
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["Process", "Archive"], // Invalidate cache when analysis starts
    }),
    startDescription: builder.mutation<
      IResponseStartDescription,
      IRequestStartDescription
    >({
      query: (body) => ({
        url: "/v2/static/card/description",
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["Process", "Archive"], // Invalidate cache when description starts
    }),
    getProcessList: builder.query<IProcessResponse, void>({
      query: () => ({
        url: "/v2/process",
        method: "GET",
      }),
      providesTags: ["Process"],
    }),
    // Endpoint for card analysis
    getCardAnalysis: builder.query<ICardAnalysisResponse, number>({
      query: (cardId) => ({
        url: `/v1/card/analysis?card_id=${cardId}`,
        method: "GET",
      }),
    }),
    // Endpoint for card description
    getCardDescription: builder.query<ICardDescriptionResponse, number>({
      query: (cardId) => ({
        url: `/v1/card/description?card_id=${cardId}`,
        method: "GET",
      }),
    }),
    // Endpoint for archive
    getArchive: builder.query<IArchiveResponse, number>({
      query: (page = 1) => ({
        url: `/v1/archive?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Archive"],
    }),
  }),
});

export const {
  useGetMainInfoQuery,
  usePostCardMutation,
  useStartAnalysisMutation,
  useStartDescriptionMutation,
  useGetProcessListQuery,
  useGetCardAnalysisQuery,
  useGetCardDescriptionQuery,
  useGetArchiveQuery,
} = mainApi;
