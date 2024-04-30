import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spin, message } from 'antd';
import useFetchApi from '../hooks/useFetchApi';
import { isMobile } from 'react-device-detect'; // Import hàm kiểm tra thiết bị mobile từ thư viện react-device-detect

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const userLocalData = JSON.parse(localStorage.getItem('CURRENT_USER'));
  const [user, setUser] = useState(userLocalData || null);
  const { loading, data } = useFetchApi({ url: `/user/${user?.id}` });
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!loading && JSON.stringify(user) !== JSON.stringify(data.user)) {
      setUser(data.user);
    }
  }, [data]);

  const setToast = (content, type = 'success') => {
    return messageApi.open({
      type: type,
      content: content,
    });
  };

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
        navigate('/');
        return;
      }

      throw new Error(res.message);
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
    if (!loading && data.success === false) return navigate('/login');
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
