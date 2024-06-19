import React, { useState, useEffect } from 'react';
import { Modal, Alert, Flex, Button, Space, Typography } from 'antd';
import '../../ImportEquipmentsByExcel.css';
import DatabaseItem from './DatabaseItem.js';
import ExcelItem from './ExcelItem.js';
import { useImportEquipmentsExcelContext } from '../../../../contexts/importEquipmentsExcelContext.js';
import useDeleteApi from '../../../../hooks/useDeleteApi.js';
import useEditApi from '../../../../hooks/useEditApi.js';

const CompareModal = ({
  showCompareModal,
  setShowCompareModal,
  equipmentToCompare,
  fetchingEquipmentInDb,
  equipmentInDb,
  setEquipmentInDb,
  setEquipmentToCompare,
  initEquipmentInDb,
  initEquipmentToCompare,
}) => {
  const { data, setData, setDuplicateEquipmentsInDb, duplicateEquipmentsInDb } =
    useImportEquipmentsExcelContext();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { deleting, deleteApi } = useDeleteApi({
    url: `/equipment`,
    successMsg: 'Xử lý trùng lặp thành công!',
    successCallback: () => {
      if (
        JSON.stringify(equipmentInDb) === '{}' &&
        JSON.stringify(equipmentToCompare) === '{}'
      ) {
        setData(
          data.filter(
            (item) => item.kyMaHieu !== initEquipmentToCompare.kyMaHieu
          )
        );
        setDuplicateEquipmentsInDb(
          duplicateEquipmentsInDb.filter(
            (item) => item.kyMaHieu !== initEquipmentInDb.kyMaHieu
          )
        );
        setShowConfirmModal(false);
        setShowCompareModal(false);
        setEquipmentInDb({});
        setEquipmentToCompare({});
        return;
      }

      if (JSON.stringify(equipmentInDb) === '{}') {
        const updatedData = data.map((item) =>
          item.kyMaHieu === initEquipmentInDb.kyMaHieu
            ? { ...item, ...initEquipmentInDb }
            : item
        );

        setData(updatedData);
        setDuplicateEquipmentsInDb(
          duplicateEquipmentsInDb.filter(
            (item) => item.kyMaHieu !== initEquipmentInDb.kyMaHieu
          )
        );
        setShowConfirmModal(false);
        setShowCompareModal(false);
        setEquipmentInDb({});
        setEquipmentToCompare({});
        return;
      }
    },
  });

  const { editing, editApi } = useEditApi({
    url: `/equipment/${initEquipmentInDb.id}`,
    successCallback: () => {
      if (JSON.stringify(equipmentToCompare) === '{}') {
        setData(
          data.filter(
            (item) => item.kyMaHieu !== initEquipmentToCompare.kyMaHieu
          )
        );
        setDuplicateEquipmentsInDb(
          duplicateEquipmentsInDb.filter(
            (item) => item.kyMaHieu !== initEquipmentToCompare.kyMaHieu
          )
        );
        setShowConfirmModal(false);
        setShowCompareModal(false);
        setEquipmentInDb({});
        setEquipmentToCompare({});
        return;
      }

      const updatedData = data.map((item) =>
        item.kyMaHieu === initEquipmentInDb.kyMaHieu
          ? { ...item, ...equipmentToCompare }
          : item
      );

      setData(updatedData);
      setDuplicateEquipmentsInDb(
        duplicateEquipmentsInDb.filter(
          (item) => item.kyMaHieu !== initEquipmentInDb.kyMaHieu
        )
      );
      setShowConfirmModal(false);
      setShowCompareModal(false);
      setEquipmentInDb({});
      setEquipmentToCompare({});
    },
  });

  useEffect(() => {
    setShowConfirmModal(false);
  }, [deleting, editing]);

  const handleResolveDuplicate = async () => {
    try {
      if (JSON.stringify(equipmentInDb) === '{}') {
        await deleteApi(initEquipmentInDb.id);
        return;
      }

      await editApi({ body: equipmentInDb });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Xử lý trùng lặp"
      open={showCompareModal}
      onCancel={() => setShowCompareModal(false)}
      footer={null}
      width={1600}
    >
      <Flex vertical gap={32}>
        {JSON.stringify(equipmentInDb) !== '{}' &&
          JSON.stringify(equipmentToCompare) !== '{}' &&
          equipmentInDb.kyMaHieu === equipmentToCompare.kyMaHieu && (
            <Alert
              message="Xử lý các thiết bị trùng ký mã hiệu để tiếp tục!"
              type="info"
              showIcon
              closable
            />
          )}

        <DatabaseItem
          fetchingEquipmentInDb={fetchingEquipmentInDb}
          equipmentInDb={equipmentInDb}
          setEquipmentInDb={setEquipmentInDb}
          initEquipmentInDb={initEquipmentInDb}
        />
        <ExcelItem
          equipmentToCompare={equipmentToCompare}
          setEquipmentToCompare={setEquipmentToCompare}
          initEquipmentToCompare={initEquipmentToCompare}
        />
        <Flex gap={8} justify="flex-end">
          <Button
            key="back"
            onClick={() => setShowCompareModal(false)}
            disabled={deleting}
          >
            Hủy
          </Button>

          <Modal
            title="Xác nhận hoàn thành xử lý trùng lặp"
            open={showConfirmModal}
            onCancel={() => setShowConfirmModal(false)}
            footer={null}
          >
            <Space direction="vertical" align="end">
              <Typography.Text>
                Hành động này sẽ xóa hoặc thay đổi dữ liệu thiết bị trong cơ sở
                dữ liệu. Dữ liệu đã xóa hoặc thay đổi không thể khôi phục, bạn
                có chắc chắn muốn xóa?
              </Typography.Text>
              <Space justify="end">
                <Button key="back" onClick={() => setShowConfirmModal(false)}>
                  Hủy
                </Button>
                <Button
                  type="primary"
                  loading={deleting || editing}
                  onClick={() => {
                    handleResolveDuplicate();
                  }}
                >
                  Xác nhận
                </Button>
              </Space>
            </Space>
          </Modal>

          <Button
            type="primary"
            htmlType="submit"
            disabled={
              JSON.stringify(equipmentInDb) !== '{}' &&
              JSON.stringify(equipmentToCompare) !== '{}' &&
              equipmentInDb.kyMaHieu === equipmentToCompare.kyMaHieu
            }
            onClick={() => {
              if (
                JSON.stringify(equipmentInDb) !==
                JSON.stringify(initEquipmentInDb)
              )
                return setShowConfirmModal(true);
              handleResolveDuplicate();
            }}
          >
            Hoàn thành
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default CompareModal;
