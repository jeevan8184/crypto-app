import React from 'react'
import { useGetNewsQuery } from '../services/CryptoNews'
import {Card, Col,Row, Typography} from 'antd'
import moment from 'moment';

const {Title,Text}=Typography
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = () => {
  const {data}=useGetNewsQuery();
  console.log(data);


  return (
    <Row gutter={[32,32]}>
      {data?.data.map((news,i)=> (
        <Col xs={24} sm={12} lg={7} key={i}>
          <Card hoverable className='news-card'>
            <div className='news-image'>
              <Title level={5} >{news.title}</Title>
              <img src={news.thumbnail} alt='thumbnail' height={120} width={120} />
              <hr />
            </div>
            <p>{news.description}</p>
            <div className='created'>
              <p style={{display:'block',fontWeight:700,margin:'10px 0'}} >{moment(new Date(news.createdAt)).fromNow()}</p>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News