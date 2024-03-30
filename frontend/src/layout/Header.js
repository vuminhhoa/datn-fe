import React from 'react';
import { Layout, theme, Flex, Typography, Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/authProvider';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

function AppHeader() {
  const { user, logoutAction } = useAuth();
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
    {
      label: 'Thay đổi mật khẩu',
      key: '1',
    },
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
        padding: 0,
        background: colorBgContainer,
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
        <div></div>
        <Typography.Title
          level={5}
          style={{ margin: 0, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          QUẢN LÝ HOẠT ĐỘNG PHÒNG VẬT TƯ TRANG THIẾT BỊ Y TẾ
        </Typography.Title>
        <Flex
          align="center"
          justify="end"
          gap={12}
          style={{
            width: '160px',
          }}
        >
          <Typography>{user?.name || user.email} </Typography>
          <Dropdown
            menu={{
              items,
              onClick,
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Avatar src={user.img} icon={<UserOutlined />} />
            </a>
          </Dropdown>
        </Flex>
      </Flex>
    </Header>
  );
}

export default AppHeader;
