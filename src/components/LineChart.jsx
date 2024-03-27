import React, { useEffect } from 'react'
import {Line} from 'react-chartjs-2'
import {Col,Row,Typography} from 'antd'
import { Chart as ChartJS } from 'chart.js/auto'

const {Title}=Typography

const LineChart = ({coinHistory,currentPice,coinName}) => {
    console.log(coinHistory);
    const coinPrice=[];
    const coinTimeStamp=[];

    for(let i=0;i<coinHistory?.data?.history?.length;i++) {
        coinPrice.push(coinHistory.data.history[i].price);
        coinTimeStamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
    }

    const data={
        labels:coinTimeStamp,
        datasets:[
            {
                label:'Price in USD',
                data:coinPrice,
                fill:false,
                backgroundColor:'#0071bd',
                borderColor:'#0071bd'
            }
        ]
    }

    const options={
        scales:{
            yAxes:[
                {
                    ticks:{
                        beginAtZero:true
                    }
                }
            ]
        }
    }



  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
        <Col className='price-container'>
            <Title></Title>
            <Title level={5} className=''>change : <strong>{coinHistory?.data?.change}%</strong> </Title>
            <Title level={5} className=''>current {coinName} Price: <strong>${currentPice} </strong></Title>
        </Col>
      </Row>
      <Line data={data} options={options}  />
    </>
  )
}

export default LineChart