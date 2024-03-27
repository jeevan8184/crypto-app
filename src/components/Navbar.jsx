import React,{useState,useEffect} from 'react'
import {HomeOutlined,MoneyCollectOutlined,BulbOutlined,FundOutlined,MenuOutlined} from '@ant-design/icons'
import {Menu,Typography,Avatar, Button} from 'antd'
import icon from '../images/cryptocurrency.png'
import {Link} from 'react-router-dom'


const Navbar = () => {
  const [activeMenu,setActiveMenu]=useState(true);
  const [screenSize,setScreenSize]=useState(null);


  useEffect(()=> {
    const handleMenu=()=>setScreenSize(window.innerWidth);
    window.addEventListener('resize',handleMenu);
    handleMenu();
  },[])
  useEffect(()=> {
    if(screenSize<768) {
      setActiveMenu(false);
    }else {
      setActiveMenu(true);
    }

  },[screenSize])


  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title className='logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
        {screenSize<768 && (
           <Button className='menu-control-container' onClick={()=>setActiveMenu(!activeMenu)} >
           <MenuOutlined />
           </Button>
        )}
      </div>
       {activeMenu &&  (
          <div className='menu-controller'>
              <Menu theme='dark'>
          <Menu.Item icon={<HomeOutlined />} size='small'>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}  size='large'>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}  size='large'>
            <Link to='/exchanges'>Exchange</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}  size='large'>
            <Link to='/news'>News</Link>
          </Menu.Item>
        </Menu>
          </div>
       )}
    </div>
  )
}

export default Navbar;