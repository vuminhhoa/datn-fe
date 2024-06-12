import React, { useEffect, useState } from 'react';
import { Upload, Button, message, Space, Card } from 'antd';
import { UploadOutlined, FileExcelOutlined } from '@ant-design/icons';
import Page from '../../components/Page/Page.js';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import useCreateApi from '../../hooks/useCreateApi.js';
import { readExcelFile, findDuplicateRow } from '../../helpers/importExcel.js';
import { defaultExcelColumns } from '../../const/default.js';
import { downloadExcelTemplate } from '../../helpers/importExcel.js';
import DuplicateEquipmentsTable from './Components/DuplicateEquipmentsTable.js';
import ImportEquipmentsExcelContext from '../../contexts/importEquipmentsExcelContext.js';
import PreviewTable from './Components/PreviewTable.js';
import DuplicateRowsTable from './Components/DuplicateRowsTable.js';
import DeleteConfirmModal from './Components/DeleteConfirmModal.js';

const ImportEquipmentsByExcel = () => {
  const breadcrumb = useBreadcrumb(
    [
      {
        path: '/equipments/import_by_excel',
        title: 'Nhập thiết bị bằng file Excel',
      },
    ],
    true
  );
  const [data, setData] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [duplicateRows, setDuplicateRows] = useState([]);
  const [duplicateEquipmentsInDb, setDuplicateEquipmentsInDb] = useState([]);

  const { creating, createApi } = useCreateApi({
    url: `/equipments/importByExcel`,
    errorMsg: 'Nhập thiết bị thất bại',
    errorCallback: (resp) => {
      if (resp.error === 'trungThietBi') {
        const preparedData = resp.data.map((item, index) => ({
          ...item,
          key: item.kyMaHieu,
        }));
        return setDuplicateEquipmentsInDb(preparedData);
      }
    },
    successCallback: () => {
      setData([]);
    },
    successMsg: 'Nhập thiết bị thành công!',
  });

  const checkDuplicateData = (data) => {
    const duplicateEquipments = findDuplicateRow(data, 'kyMaHieu');
    setDuplicateRows(duplicateEquipments);
  };

  useEffect(() => {
    checkDuplicateData(data);
  }, [data]);

  const handleImportData = () => {
    if (duplicateRows.length > 0) {
      message.error(
        'Dữ liệu chứa thiết bị trùng ký mã hiệu. Vui lòng xử lý các thiết bị bị trùng lặp.'
      );
      return;
    }

    const cleanedData = data.map(({ id, key, updatedAt, ...rest }) => rest);

    createApi(cleanedData);
  };

  const handleFileUpload = async (file) => {
    const result = await readExcelFile(file, defaultExcelColumns);
    if (result.success) {
      setData(result.data);
      checkDuplicateData(result.data);
      return message.success(result.message);
    }

    message.error(result.message);
  };

  return (
    <ImportEquipmentsExcelContext.Provider
      value={{
        data,
        setData,
        duplicateRows,
        setDuplicateRows,
        duplicateEquipmentsInDb,
        setDuplicateEquipmentsInDb,
        checkDuplicateData,
      }}
    >
      <Page fullWidth={true}>
        {breadcrumb}
        <DeleteConfirmModal
          showDeleteConfirm={showDeleteConfirm}
          setShowDeleteConfirm={setShowDeleteConfirm}
        />

        <Card
          title="Nhập thiết bị bằng file Excel"
          extra={
            <Space>
              {data.length !== 0 && (
                <Button danger onClick={() => setShowDeleteConfirm(true)}>
                  Xóa dữ liệu
                </Button>
              )}
              {data.length > 0 ? (
                <Button
                  type="primary"
                  onClick={() => handleImportData()}
                  loading={creating}
                  disabled={
                    duplicateEquipmentsInDb.length > 0 ||
                    duplicateRows.length > 0
                  }
                >
                  Nhập
                </Button>
              ) : (
                <>
                  <Button
                    onClick={downloadExcelTemplate}
                    icon={<FileExcelOutlined />}
                  >
                    Mẫu file Excel
                  </Button>
                  <Upload
                    beforeUpload={handleFileUpload}
                    accept=".xlsx, .xls"
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />} type="primary">
                      Tải lên
                    </Button>
                  </Upload>
                </>
              )}
            </Space>
          }
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            {duplicateEquipmentsInDb.length > 0 && <DuplicateEquipmentsTable />}
            {duplicateRows.length > 0 && <DuplicateRowsTable />}
            <PreviewTable />
          </Space>
        </Card>
      </Page>
    </ImportEquipmentsExcelContext.Provider>
  );
};

export default ImportEquipmentsByExcel;
