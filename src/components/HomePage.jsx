import React from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { CircularProgress, Grid, Typography } from '@mui/material';
import millify from 'millify'
import { Col, Row, Space, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import {Cryptocurrencies} from './index';

const HomePage = () => {
  const {data,isFetching}=useGetCryptosQuery(10);
  console.log(data);
  const stats=data?.data.stats;
  if(isFetching) return <CircularProgress size='3rem' style={{display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}/>

  return (
    <div className=''>
      <Typography variant='h4' gutterBottom>Global Cryptocurrencies</Typography>
      <Row>
         <Col span={12}><Statistic value={millify(stats.total)} title="cryptocurrencies total" /></Col>
         <Col span={12}><Statistic value={millify(stats.total24hVolume)} title="Total 24h Volume" /></Col>
         <Col span={12}><Statistic value={millify(stats.totalCoins)} title=" Total Coins" /></Col>
         <Col span={12}><Statistic value={millify(stats.totalExchanges)} title=" Total Exchanges" /></Col>
         <Col span={12}><Statistic value={millify(stats.totalMarketCap)} title=" Total Market Cap" /></Col>
         <Col span={12}><Statistic value={millify(stats.totalMarkets)} title=" Total Markets" /></Col>
      </Row>
      <Space />
      <div className='crypto-details'>
         <Typography gutterBottom variant='h5'>Top 10 Cryptocurrencies in the World</Typography>
         <Link to='/cryptocurrencies'>Show more</Link>
      </div>
      <Cryptocurrencies simplified />
      <div className='crypto-details'>
         <Typography gutterBottom variant='h5'>Breaking Crypto news </Typography>
         <Link to='/cryptocurrencies'>Show more</Link>
      </div>

    </div>
  )
}

export default HomePage