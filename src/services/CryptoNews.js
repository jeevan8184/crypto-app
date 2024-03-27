import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders={
  'X-RapidAPI-Key': '3d877dbadcmsh37d61d2884e40c2p14326fjsn4d2f50d494c9',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
}

const baseUrl='https://cryptocurrency-news2.p.rapidapi.com';

const createRequest=(url)=>({url,headers:cryptoApiHeaders});

export const cryptoNews=createApi({
  reducerPath:'cryptoNews',
  baseQuery:fetchBaseQuery({baseUrl}),
  endpoints:(builder)=> ({
      getNews:builder.query({
          query:()=>createRequest(`/v1/coindesk`),
      })
  })
})

export const {useGetNewsQuery}=cryptoNews;

// method: 'GET',
// url: 'https://crypto-news16.p.rapidapi.com/news/top/5',
// headers: {
//   'X-RapidAPI-Key': '3d877dbadcmsh37d61d2884e40c2p14326fjsn4d2f50d494c9',
//   'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
// }
