import { Menu } from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import React from 'react';

const MenuList = () => {
  return (
    <Menu theme='dark'>
      <Menu.Item key='home' icon={<HomeOutlined />}>
        Tableau de bord
      </Menu.Item>
      <Menu.Item key='home' icon={<HomeOutlined />}>
        Election du représentant
      </Menu.Item>
      <Menu.Item key='home' icon={<HomeOutlined />}>
        Guide de l'électeur
      </Menu.Item>
      <Menu.Item key='home' icon={<HomeOutlined />}>
        Visualisation des serveurs
      </Menu.Item>
      <Menu.Item key='home' icon={<HomeOutlined />}>
        Déconnexion
      </Menu.Item>
    </Menu>
  )
}

export default MenuList;