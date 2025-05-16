import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMainResponse, IProcessResponse, IRequestPostCard, IRequestStartAnalysis, IRequestStartDescription, IResponseCard, IResponseStartAnalysis, IResponseStartDescription } from '../types'
import { axiosBaseQuery } from '@/axios/axiosBaseQuery'

const BASE_URL = "https://api.stage.seo-ai.kz/c";

export const mainApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: BASE_URL + '/v2' }),
    endpoints: (builder) => ({
        getMainInfo: builder.query<IMainResponse, void>({
            query: () => ({
                url: '/main',
                method: 'GET',
            }),
        }),
        postCard: builder.mutation<IResponseCard, IRequestPostCard>({
            query: (body) => ({
                url: '/static/card',
                method: 'POST',
                data: body,
            }),
        }),
        startAnalysis: builder.mutation<IResponseStartAnalysis, IRequestStartAnalysis>({
            query: (body) => ({
                url: '/static/card/analyse',
                method: 'PUT',
                data: body,
            }),
        }),
        startDescription: builder.mutation<IResponseStartDescription, IRequestStartDescription>({
            query: (body) => ({
                url: '/static/card/description',
                method: 'PUT',
                data: body,
            }),
        }),
        getProcessList: builder.query<IProcessResponse, void>({
            query: () => ({
                url: '/process',
                method: 'GET',
            }),
        }),
    }),
})

export const { 
                useGetMainInfoQuery, 
                usePostCardMutation, 
                useStartAnalysisMutation, 
                useStartDescriptionMutation,
                useGetProcessListQuery,
            } = mainApi