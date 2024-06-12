import React from 'react';
import { Button, Modal, Typography, Space } from 'antd';
import { useImportEquipmentsExcelContext } from '../../../contexts/importEquipmentsExcelContext';

const DeleteConfirmModal = ({ showDeleteConfirm, setShowDeleteConfirm }) => {
  const { setData, setDuplicateEquipmentsInDb, setDuplicateRows } =
    useImportEquipmentsExcelContext();

  return (
    <Modal
      title="Xác nhận xóa"
      open={showDeleteConfirm}
      onCancel={() => setShowDeleteConfirm(false)}
      footer={null}
    >
      <Space direction="vertical" align="end">
        <Typography.Text>
          Hành động này sẽ xóa toàn bộ dữ liệu đã tải lên và những thay đổi đã
          thực hiện. Dữ liệu đã xóa không thể khôi phục, bạn có chắc chắn muốn
          xóa?
        </Typography.Text>
        <Space justify="end">
          <Button key="back" onClick={() => setShowDeleteConfirm(false)}>
            Hủy
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              setDuplicateRows([]);
              setDuplicateEquipmentsInDb([]);
              setData([]);
              setShowDeleteConfirm(false);
            }}
          >
            Xóa
          </Button>
        </Space>
      </Space>
    </Modal>
  );
};

export default DeleteConfirmModal;
