import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Flex,
  Row,
  Col,
  Avatar,
  Typography,
  Breadcrumb,
  Button,
} from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/authProvider';

const RoleSetting = () => {
  const { user } = useAuth();

  return (
    <Flex vertical gap={16}>
      <Breadcrumb
        items={[
          {
            href: '/',
            title: <HomeOutlined />,
          },
          {
            href: '/settings/roles-settings',
            title: 'Cài đặt vai trò',
          },
        ]}
      />
      hello
    </Flex>
  );
};

export default RoleSetting;
