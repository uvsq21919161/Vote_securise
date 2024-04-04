import { useState } from 'react';
import Login from './pages/login';
import Election from './pages/election';
import Logo from './components/Logo';
import './App.css';
import MenuList from './components/MenuList';
import {Routes, Route} from 'react-router-dom'
import { SidebarProvider } from './components/Sidebarprovider';
import Sidebar from './components/Sidebar';


// const { Header, Sider } = Layout;

function App() {
  return (
    <>
      {/* <Layout>
        <Sider className='sidebar'>
          <Logo />
          <MenuList />
        </Sider>
      </Layout> */}
      {/* <Login /> */}
      <SidebarProvider>
        <Sidebar />
        <Election />
      </SidebarProvider>
    </>
  )
}

export default App
