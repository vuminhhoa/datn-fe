import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isMobile } from 'react-device-detect'; // Import hàm kiểm tra thiết bị mobile từ thư viện react-device-detect
import fetchAuthApi from '../helpers/fetchAuthApi';
import { Spin } from 'antd';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem('CURRENT_USER'));
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [user, setUser] = useState(userLocal);
  const [verifying, setVerifying] = useState(true);

  const verifyUser = async () => {
    try {
      const res = await fetchAuthApi({ url: `/user/${userLocal.id}` });
      if (res.data.success) {
        setUser(res.data.data);
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
        setToken(res.data.data.accessToken);
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
    setToken('');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('CURRENT_USER');
    setUser(null);
    navigate('/login');
  };

  if (verifying) {
    return (
      <Spin spinning={true} size="large" fullscreen tip={<>Đang tải...</>} />
    );
  }

  if (isMobile) {
    return (
      <div>
        <p>
          Trang web hiện chưa hỗ trợ giao diện thiết bị mobile. Vui lòng quay
          lại sau hoặc sử dụng trên các thiết bị khác!
        </p>
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
