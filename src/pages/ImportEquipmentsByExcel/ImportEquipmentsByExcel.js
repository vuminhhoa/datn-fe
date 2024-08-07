import React, { useEffect, useState } from 'react';
import { Upload, Button, message, Space, Card, Flex, Select } from 'antd';
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
import { useAppContext } from '../../contexts/appContext.js';
import { useLocation, useNavigate } from 'react-router-dom';

const ImportEquipmentsByExcel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialBiddingId = queryParams.get('biddingId');
  const initialDepartmentId = queryParams.get('departmentId');
  const { departments, biddings } = useAppContext();
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

  const [selectedDepartment, setSelectedDepartment] = useState(
    Number(initialDepartmentId)
  );
  const [selectedBidding, setSelectedBidding] = useState(
    Number(initialBiddingId)
  );
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
      if (initialBiddingId) {
        return navigate(`/shopping/${initialBiddingId}`);
      }
      setData([]);
    },
    successMsg: selectedBidding
      ? 'Tạo DS thiết bị xem trước cho hoạt động thành công!'
      : 'Nhập thiết bị thành công!',
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

    const cleanedData = data.map(({ id, key, updatedAt, ...rest }) => {
      return {
        ...rest,
        BiddingId: selectedBidding,
        DepartmentId: selectedDepartment,
      };
    });

    createApi({
      body: {
        data: cleanedData,
        BiddingId: selectedBidding,
        DepartmentId: selectedDepartment,
      },
    });
  };

  const handleFileUpload = async (file) => {
    try {
      const result = await readExcelFile(file, defaultExcelColumns);
      if (result.success) {
        setData(result.data);
        checkDuplicateData(result.data);
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error(`File upload failed: ${error.message}`);
    }
    return false; // To prevent default behavior of upload component
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
        selectedBidding,
        setSelectedBidding,
        setSelectedDepartment,
        selectedDepartment,
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
            <Flex gap={8}>
              <Select
                placeholder="Chọn khoa phòng"
                allowClear
                value={
                  departments.find((item) => item.id === selectedDepartment)
                    ?.tenKhoaPhong
                }
                onChange={(val) => setSelectedDepartment(val)}
                style={{
                  width: '100%',
                }}
                options={[
                  ...departments.map((item) => ({
                    label: item.tenKhoaPhong,
                    value: item.id,
                  })),
                ]}
              />
              <Select
                placeholder="Chọn dự án"
                allowClear
                value={
                  biddings.find((item) => item.id === selectedBidding)
                    ?.tenDeXuat
                }
                onChange={(val) => setSelectedBidding(val)}
                style={{
                  width: '100%',
                }}
                options={[
                  ...biddings
                    .filter(
                      (item) =>
                        item.trangThaiHoatDong === 'pendingProcess' ||
                        item.trangThaiHoatDong === 'pendingApprove' ||
                        item.trangThaiHoatDong === 'processing'
                    )
                    .map((item) => ({
                      label: item.tenDeXuat,
                      value: item.id,
                    })),
                ]}
              />
            </Flex>
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
