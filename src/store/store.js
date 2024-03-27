import {configureStore} from '@reduxjs/toolkit';
import  {cryptoApi}  from '../services/cryptoApi';
import { cryptoNews } from '../services/CryptoNews';


export default configureStore({
    reducer:{
        [cryptoApi.reducerPath]:cryptoApi.reducer,
        [cryptoNews.reducerPath]:cryptoNews.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware,cryptoNews.middleware)
})
