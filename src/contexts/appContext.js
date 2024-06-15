import { useContext, createContext } from 'react';
import { message } from 'antd';
import useFetchApi from '../hooks/useFetchApi';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const {
    data: roles,
    loading: loadingRoles,
    fetchApi: fetchRoles,
  } = useFetchApi({ url: '/roles', defaultData: [] });
  const {
    data: departments,
    loading: loadingDepartments,
    fetchApi: fetchDepartments,
  } = useFetchApi({
    url: '/departments',
    defaultData: [],
  });

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
        roles,
        departments,
        loadingRoles,
        loadingDepartments,
        fetchRoles,
        fetchDepartments,
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
