import React, { useState } from 'react';
import { useGetDetailsQuery,useGetCryptosHistoryQuery} from '../services/cryptoApi'
import { useParams } from  'react-router-dom'
import { CircularProgress } from '@mui/material';
import millify from 'millify';
import {MoneyCollectOutlined,DollarCircleOutlined,FundOutlined,ExclamationCircleOutlined,StopOutlined,TrophyOutlined,CheckOutlined,NumberOutlined,ThunderboltOutlined} from '@ant-design/icons'
import { Col,Typography,Select, Row } from 'antd';
import parse from 'html-react-parser';
import LineChart from './LineChart';

const {Text,Title}=Typography;
const {Option}=Select;
const CryptoDetails = () => {
   const {id}=useParams();
   const [timePeriod, setTimePeriod] = useState('7d');
   const timedata=['3h','24h','7d','30d','1y','3m','3y','5y'];

   const {data,isFetching}=useGetDetailsQuery(id);
   const {data:coinHistory}=useGetCryptosHistoryQuery({id,timePeriod})  

  const currency=data?.data?.coin;


  if(isFetching) return <CircularProgress size='3rem' style={{display:'flex',justifyContent:'center',alignItems:'center'}}/>

  const stats=[
    {title:'Price to USD',value:`$ ${currency?.price && millify(currency.price)}` ,icon:<DollarCircleOutlined />},
    {title:'Rank',value:currency?.rank,icon:<NumberOutlined />},
    {title:'24h volume' , value:`$ ${currency['24hVolume'] && millify(currency['24hVolume'])}`,icon:<ThunderboltOutlined />},
    {title:'Market Cap',value:`$ ${currency?.marketCap && millify(currency?.marketCap)}`,icon:<DollarCircleOutlined />},
    {title:'All time high(daily.avg)', value:`$ ${currency?.allTimeHigh?.price && millify(currency?.allTimeHigh?.price)}`,icon:<TrophyOutlined />}
  ]

  const genericStats=[
    {title:'Number of Markets',value:currency?.numberOfMarkets,icon:<FundOutlined />},
    {title:'Number of Exchanges',value:currency?.numberOfExchanges,icon:<MoneyCollectOutlined />},
    {title:'Approved Supply',value:currency?.supply?.confirmed? <CheckOutlined /> : <StopOutlined />,icon:<ExclamationCircleOutlined />},
    {title:'Circulating supply',value:` ${currency?.supply?.circulating && millify(currency?.supply?.circulating)}`,icon:<ExclamationCircleOutlined />},
    {title:'Total supply',value:` ${currency?.supply?.total && millify(currency?.supply?.total)}`,icon:<ExclamationCircleOutlined />}
  ]

  return (
    <Col style={{margin:'30px'}}>
      <Col className='coin-heading'>
        <Title  className='coin-details-heading'>{currency.name} ({currency.symbol})</Title>
        <p>Current details of {currency.name} view statistics</p>
      </Col>
      <hr />
      <Select value={timePeriod} onChange={(value)=>setTimePeriod(value)} className='select' placeholder='select time period' >
        {timedata.map((date)=> <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPice={millify(currency.price)} coinName={currency.name} />
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {currency.name} Value Statistics
            </Title>
            <p>An overview showing the statistics of {currency.name} ,such as rank,price and marketCap etc., </p>
          </Col>
          {stats.map(({icon,title,value})=> (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
            <p>An overview showing the statistics of All cryptocurrencies </p>
          </Col>
          {genericStats.map(({icon,title,value})=> (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Col className='coin-desc'>
          <Title level={3} className='coin-details-heading'>What is {currency.name} </Title>
          <p>{parse(currency.description)}</p>
        </Col>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {currency.name} links
          </Title>
          {currency.links.map((link,idx)=>(
            <Row className='coin-link' key={idx}>
               {link.url && (
                 <>
                    <Title level={5} className='link-name'>{link.type}</Title>
                    <a href={link.url} target='_blank' rel='noreferrer'>{link.name}</a>
                 </>
               )}
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails;