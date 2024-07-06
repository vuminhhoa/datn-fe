import React from 'react';
import {
  Layout,
  theme,
  Flex,
  Typography,
  Avatar,
  Dropdown,
  Button,
} from 'antd';
import { BugOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';

const { Header } = Layout;

function AppHeader() {
  const { logoutAction, user } = useAuthContext();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = ({ key }) => {
    if (Number(key) === 2) {
      logoutAction();
    }
    if (Number(key) === 0) {
      return navigate('/profile');
    }
  };

  const items = [
    {
      label: 'Tài khoản',
      key: '0',
    },
    // {
    //   label: 'Thay đổi mật khẩu',
    //   key: '1',
    // },
    {
      type: 'divider',
    },
    {
      label: 'Đăng xuất',
      key: '2',
    },
  ];

  return (
    <Header
      style={{
        backgroundColor: colorBgContainer,
        padding: 0,
        height: '56px',
      }}
    >
      <Flex
        style={{
          width: '100%',
          height: '100%',
          paddingInline: '16px',
        }}
        justify={'space-between'}
        align={'center'}
      >
        <div style={{ width: '250px' }}>
          {user.RoleId === 1 && (
            <Button
              icon={<BugOutlined />}
              type="link"
              onClick={() => navigate('/dev_zone')}
            />
          )}
        </div>
        <Flex
          align="center"
          gap={16}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <Avatar
            size={'large'}
            src="https://inhoangkien.vn/wp-content/uploads/2020/04/Logo-B%E1%BB%99-Y-t%E1%BA%BF-01-e1585994422207-300x213.png"
          />
          <Typography.Title level={5} style={{ margin: 0, cursor: 'pointer' }}>
            Phòng Vật tư Trang thiết bị Y tế
          </Typography.Title>
        </Flex>

        <Flex
          align="center"
          justify="flex-end"
          gap={12}
          style={{
            width: '250px',
          }}
        >
          <Flex vertical align="flex-end">
            <Typography.Text strong>
              {user?.name || user.email}{' '}
            </Typography.Text>
            <Typography.Text italic>{user.Role.name} </Typography.Text>
          </Flex>
          <Dropdown
            menu={{
              items,
              onClick,
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Avatar src={user.image} icon={<UserOutlined />} size={'large'} />
            </a>
          </Dropdown>
        </Flex>
      </Flex>
    </Header>
  );
}

export default AppHeader;
