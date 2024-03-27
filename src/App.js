import React from 'react'
import {Route,Link,Routes} from 'react-router-dom';
import { CryptoDetails, Cryptocurrencies, Exchanges, HomePage, Navbar, News } from './components';
import { Layout, Space, Typography } from 'antd';
import './App.css'

const {Title}=Typography;
const App = () => {
  return (
    <div className='app'>
        <div className='navbar'>
            <Navbar />
        </div>
        <div className='main'>
            <Layout>
             <div className='routes'>
                <Routes>
                    <Route exact path='/' element={<HomePage /> } />
                    <Route exact path='/exchanges' element={<Exchanges /> } />
                    <Route exact path='/cryptocurrencies' element={<Cryptocurrencies /> } />
                    <Route exact path='/crypto/:id' element={<CryptoDetails /> } />
                    <Route exact path='/news' element={<News />} />
                </Routes>
             </div>
            </Layout>
        <div className='footer'>
            <Title level={5} style={{color:'white'}}>Cryptoverse <br/> All Right reserved</Title>
            <Space>
                <Link to='/'>Home</Link>
                <Link to='/exchanges'>Exchanges</Link>
                <Link to='/news'>News</Link>
            </Space>
        </div>
        </div>
    </div>
  )
}

export default App