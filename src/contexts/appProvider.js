import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Spin, message } from 'antd';
import { isMobile } from 'react-device-detect'; // Import hàm kiểm tra thiết bị mobile từ thư viện react-device-detect

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const userLocalData = localStorage.getItem('CURRENT_USER');
  const [user, setUser] = useState(userLocalData);
  const [data, setData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const navigate = useNavigate();
  const location = useLocation();
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
      if (!token || !userLocalData) {
        setLoading(false);
        return navigate('/login');
      }

      const resp = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BASE_API_URL}/user/${user?.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.data.success) {
        setUser(resp.data.user);
        setData(resp.data);
        localStorage.setItem('CURRENT_USER', JSON.stringify(resp.data.user));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) return;
    fetchAppUser();
  }, [userLocalData]);

  useEffect(() => {
    if (
      !loading &&
      JSON.stringify(user) !== JSON.stringify(data.user) &&
      userLocalData
    ) {
      setUser(data.user);
      localStorage.setItem('CURRENT_USER', JSON.stringify(data.user));
    }
  }, [data]);

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

  useEffect(() => {
    if (
      !loading &&
      data.success === false &&
      !['/sign-up', '/login'].includes(location.pathname)
    )
      return navigate('/login');
  }, [data]);

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
