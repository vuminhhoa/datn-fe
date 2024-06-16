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
    setData: setRoles,
  } = useFetchApi({ url: '/roles', defaultData: [] });
  const {
    data: departments,
    loading: loadingDepartments,
    fetchApi: fetchDepartments,
    setData: setDepartments,
  } = useFetchApi({
    url: '/departments',
    defaultData: [],
  });
  const {
    data: biddings,
    loading: loadingBiddings,
    fetchApi: fetchBiddings,
    setData: setBiddings,
  } = useFetchApi({
    url: '/biddings',
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
        departments,
        loadingDepartments,
        fetchDepartments,
        setDepartments,
        setRoles,
        loadingRoles,
        roles,
        fetchRoles,
        setBiddings,
        loadingBiddings,
        biddings,
        fetchBiddings,
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
