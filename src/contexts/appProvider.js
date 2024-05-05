import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Spin, message } from 'antd';
import { isMobile } from 'react-device-detect'; // Import hàm kiểm tra thiết bị mobile từ thư viện react-device-detect

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('CURRENT_USER'))
  );
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [loading, setLoading] = useState(true);

  const [messageApi, contextHolder] = message.useMessage();

  const setToast = (content, type = 'success') => {
    return messageApi.open({
      type: type,
      content: content,
    });
  };
  const fetchAppUser = async () => {
    try {
      const resp = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BASE_API_URL}/user/${user.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.data.success) {
        setUser(resp.data.user);
        localStorage.setItem('CURRENT_USER', JSON.stringify(resp.data.user));
        setLoading(false);
        return navigate(location.pathname);
      }
      return navigate('/login');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDashboard = async () => {
    try {
      const resp = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BASE_API_URL}/dashboard`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (['/sign-up', '/login'].includes(location.pathname)) {
      return setLoading(false);
    }
    if (!token || !user) {
      setLoading(false);
      return navigate('/login');
    }
    fetchAppUser();
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
      setToast(res.data.message, 'error');
    } catch (err) {
      console.error(err);
    }
  };

  const logoutAction = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('CURRENT_USER');
    navigate('/login');
  };

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

  if (loading)
    return (
      <Spin spinning={loading} size="large" fullscreen tip={<>Đang tải...</>} />
    );

  return (
    <AppContext.Provider
      value={{
        token,
        user,
        setUser,
        loginAction,
        logoutAction,
        fetchAppUser,
        setToast,
      }}
    >
      {contextHolder}
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useApp = () => {
  return useContext(AppContext);
};
