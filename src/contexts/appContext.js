import { useContext, createContext } from 'react';
import { message } from 'antd';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const setToast = (content, type = 'success') => {
    return messageApi.open({
      type: type,
      content: content,
    });
  };

  return (
    <AppContext.Provider
      value={{
        setToast,
      }}
    >
      {contextHolder}
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
