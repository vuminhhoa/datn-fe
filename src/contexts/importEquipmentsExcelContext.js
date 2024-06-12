import { createContext, useContext } from 'react';

const ImportEquipmentsExcelContext = createContext({});

export const useImportEquipmentsExcelContext = () =>
  useContext(ImportEquipmentsExcelContext);

export default ImportEquipmentsExcelContext;
