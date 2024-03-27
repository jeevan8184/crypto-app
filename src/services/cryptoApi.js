
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const cryptoApiHeaders={
    'X-RapidAPI-Key': '3d877dbadcmsh37d61d2884e40c2p14326fjsn4d2f50d494c9',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl='https://coinranking1.p.rapidapi.com';

const createRequest=(url)=>({url,headers:cryptoApiHeaders});

export const cryptoApi=createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=> ({
        getCryptos:builder.query({
            query:(count)=>createRequest(`/coins?limit=${count}`),
        }),
        getDetails:builder.query({
            query:(id)=>createRequest(`/coin/${id}`)
        }),
        getCryptosHistory:builder.query({
            query:({id,timePeriod})=>createRequest(`/coin/${id}/history?timePeriod=${timePeriod}`)
        }),
        getExchanges:builder.query({
            query:()=>createRequest('/exchanges')
        })
    })
})

export const {useGetCryptosQuery,useGetDetailsQuery,useGetCryptosHistoryQuery,useGetExchangesQuery}=cryptoApi;


// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       'tiers[0]': '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
