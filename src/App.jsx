import { useState } from 'react';
import Login from './pages/login';
import Election from './pages/election';
import Visu from './pages/visu';
import Visu1 from './pages/visu1';
import Visu2 from './pages/visu2';
import Visu3 from './pages/visu3';
import Visu4 from './pages/visu4';
import Visu5 from './pages/visu5';
import Visu6 from './pages/visu6';
import Visu7 from './pages/visu7';
import Visu8 from './pages/visu8';
import Visu9 from './pages/visu9';
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
        <Visu />
      </SidebarProvider>
    </>
  )
}

export default App;
