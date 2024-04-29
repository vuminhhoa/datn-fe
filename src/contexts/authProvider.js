import { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const userLocalData = JSON.parse(localStorage.getItem('CURRENT_USER'));
  const [user, setUser] = useState(userLocalData || null);
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

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

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
