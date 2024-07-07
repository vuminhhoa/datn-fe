import React, { useState, useContext } from 'react';
import { Flex, Button, Typography, Tag, Upload } from 'antd';
import DatePickerFormat from './DatePickerFormat';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppContext } from '../../../contexts/appContext';
import BiddingContext from '../../../contexts/biddingContext';
import { convertBase64 } from '../../../helpers/uploadFile';
import hasPermission from '../../../helpers/hasPermission';
import { BIDDING_UPDATE } from '../../../const/permission';

const BiddingItem = ({
  obj = '',
  input = {},
  title = '',
  tagStatus = {},
  dateField = null,
  documentField = null,
}) => {
  const {
    data,
    setData,
    saving,
    setDeletedFields,
    initData,
    setCreatedFields,
    setUpdatedFields,
    createdFields,
    deletedFields,
    updatedFields,
    canAction,
  } = useContext(BiddingContext);
  const initInput = initData[obj];
  const { setToast } = useAppContext();
  const [isEditItem, setIsEditItem] = useState(false);
  const [documentPreview, setDocumentPreview] = useState(null);
  const handleChangeFile = async (file, field) => {
    try {
      const fileUrl = URL.createObjectURL(file);

      if (file.size > 2000000) {
        return setToast('Vui lòng chọn file nhỏ hơn 2MB', 'error');
      }
      const fileBase64 = await convertBase64(file);
      setDocumentPreview(fileUrl);
      setData({
        ...data,
        [obj]: {
          ...input,
          [field]: JSON.stringify({
            fileBase64: fileBase64,
            fileName: file.name,
          }),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex vertical>
      <Flex align="flex-start" gap={8} justify="space-between">
        <Flex gap={4}>
          <Typography.Text>
            {title} <Tag color={tagStatus.tagColor}>{tagStatus.text}</Tag>
          </Typography.Text>
          {input[documentField] && !!documentField && !isEditItem && (
            <Button
              disabled={saving}
              style={{ padding: '0px' }}
              type="link"
              href={documentPreview || input[documentField]}
              target="_blank"
            >
              Xem tài liệu
            </Button>
          )}
        </Flex>
        {hasPermission(BIDDING_UPDATE) && canAction && (
          <Button
            disabled={saving}
            type="link"
            onClick={() => setIsEditItem(!isEditItem)}
            style={{ margin: '0px' }}
          >
            {isEditItem ? 'Xác nhận' : 'Cập nhật'}
          </Button>
        )}
      </Flex>

      {isEditItem && (
        <Flex vertical justify="right" gap={4} align="start">
          <Typography.Text>Ngày hoàn thành:</Typography.Text>
          <DatePickerFormat field={dateField} obj={obj} />
          {!!documentField && (
            <>
              <Flex gap={4}>
                <Typography.Text>Tài liệu: </Typography.Text>
                {input[documentField] && (
                  <Button
                    disabled={saving}
                    style={{ padding: '0px', margin: '0px' }}
                    type="link"
                    href={documentPreview || input[documentField]}
                    target="_blank"
                  >
                    Xem
                  </Button>
                )}
              </Flex>
              {!!input[documentField] && (
                <Button
                  disabled={saving}
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => {
                    if (initInput[documentField]) {
                      setDeletedFields((prev) => [
                        ...prev,
                        `${obj}.${documentField}`,
                      ]);
                    }
                    if (updatedFields.includes(`${obj}.${documentField}`)) {
                      setUpdatedFields((prev) => {
                        return prev.filter(
                          (val) => val !== `${obj}.${documentField}`
                        );
                      });
                    }
                    if (createdFields.includes(`${obj}.${documentField}`)) {
                      setCreatedFields((prev) => {
                        return prev.filter(
                          (val) => val !== `${obj}.${documentField}`
                        );
                      });
                    }

                    setDocumentPreview(null);
                    setData({
                      ...data,
                      [obj]: {
                        ...input,
                        [documentField]: null,
                      },
                    });
                  }}
                >
                  Xóa
                </Button>
              )}
              {!input[documentField] && (
                <Upload
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                  beforeUpload={() => {
                    return false;
                  }}
                  onChange={(e) => {
                    if (!initInput[documentField]) {
                      setCreatedFields((prev) => [
                        ...prev,
                        `${obj}.${documentField}`,
                      ]);
                    }
                    if (
                      initInput[documentField] &&
                      deletedFields.includes(`${obj}.${documentField}`)
                    ) {
                      setDeletedFields((prev) => {
                        return prev.filter(
                          (val) => val !== `${obj}.${documentField}`
                        );
                      });
                      setUpdatedFields((prev) => [
                        ...prev,
                        `${obj}.${documentField}`,
                      ]);
                    }
                    return handleChangeFile(e.file, documentField);
                  }}
                >
                  <Button disabled={saving} icon={<UploadOutlined />}>
                    Tải lên
                  </Button>
                </Upload>
              )}
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default BiddingItem;
