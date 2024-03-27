import React, { useEffect, useState } from 'react';
import {Card,CircularProgress, Grid, Grow, Typography} from '@mui/material'
import { useGetCryptosQuery } from '../services/cryptoApi';
import millify from 'millify'
import {Input, Row} from 'antd'
import {Link} from 'react-router-dom'
import News from './News';

const Cryptocurrencies = ({simplified}) => {
  const count=simplified?10:100
  const {data,isFetching}=useGetCryptosQuery(count);

  const cryptoCoins=data?.data?.coins;
  const [searchTerm, setSearchterm] = useState('');
  const [cryptos,setCryptos]=useState(data?.data?.coins)
  
  useEffect(()=> {
    if(  cryptoCoins) {
      const filter=cryptoCoins?.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setCryptos(filter)
    }
  },[searchTerm,cryptoCoins,isFetching])

  if(isFetching) return <CircularProgress size='3rem' style={{display:'flex',justifyContent:'center',alignItems:'center'}}/>

  return (
    <>
     {!simplified && (
        <div className='search'>
        <Input type='text' placeholder='search cyptos'  onChange={(e)=>setSearchterm(e.target.value)} className='input'/>
        </div>
     )}
      <Row gutter={[32,32]} style={{padding:'20px'}}>
      {cryptos?.map((coin,idx)=> (
        <Grid item lg={3} md={6} sm={12} key={idx} >
          <Card key={idx} lg={6} className='card' elevation={2}>
            <Link to={`/crypto/${coin.uuid}`}>
            <div className='items'>
              <Typography gutterBottom variant='h6' >{coin.rank} . {coin.name}</Typography>
              <img src={coin.iconUrl} alt="coin" height={40} width={40} />
            </div>
            <hr />
            <div />
             <Grid spacing={3} item>
               <p>Coin Price : {millify(coin.price)}</p>
               <p>Market Cap : {millify(coin.marketCap)}</p>
               <p>Coin Change : {coin.change}%</p>
             </Grid>
             </Link>
          </Card>
        </Grid>
      ))}
    </Row>

    </>
  )
}

export default Cryptocurrencies