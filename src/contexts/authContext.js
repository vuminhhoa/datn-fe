import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isMobile } from 'react-device-detect'; // Import hàm kiểm tra thiết bị mobile từ thư viện react-device-detect
import fetchAuthApi from '../helpers/fetchAuthApi';
import { Flex, Spin, Avatar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem('CURRENT_USER'));
  const token = localStorage.getItem('ACCESS_TOKEN');
  const [user, setUser] = useState(userLocal);
  const [verifying, setVerifying] = useState(true);

  const verifyUser = async () => {
    try {
      const res = await fetchAuthApi({ url: `/user/${userLocal.id}` });
      if (res.data.success) {
        const user = res.data.data;
        if (JSON.stringify(userLocal.Role) !== JSON.stringify(user.Role)) {
          return logoutAction();
        }

        return true;
      }
      return navigate('/login');
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (!userLocal || !token) {
      setVerifying(false);
      return navigate('/login');
    }
    verifyUser();
  }, []);

  const loginAction = async (data) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_API_URL}/auth/login`,
        data: data,
      });
      if (res.data.success) {
        setUser(res.data.data.user);
        localStorage.setItem('ACCESS_TOKEN', res.data.data.accessToken);
        localStorage.setItem(
          'CURRENT_USER',
          JSON.stringify(res.data.data.user)
        );
        return navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logoutAction = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('CURRENT_USER');
    setUser(null);
    navigate('/login');
  };

  if (verifying) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Flex vertical align="center" justify="center" gap={32}>
          <Avatar
            size={128}
            src="https://inhoangkien.vn/wp-content/uploads/2020/04/Logo-B%E1%BB%99-Y-t%E1%BA%BF-01-e1585994422207-300x213.png"
          />
          <Spin
            spinning={true}
            size="large"
            indicator={<LoadingOutlined />}
            style={{ backgroundColor: 'white' }}
          />
        </Flex>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Flex vertical align="center" justify="center" gap={32}>
          <Avatar
            size={128}
            src="https://inhoangkien.vn/wp-content/uploads/2020/04/Logo-B%E1%BB%99-Y-t%E1%BA%BF-01-e1585994422207-300x213.png"
          />
          Trang web hiện chưa hỗ trợ giao diện thiết bị mobile. Vui lòng quay
          lại sau hoặc sử dụng trên các thiết bị khác!
        </Flex>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginAction,
        logoutAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
