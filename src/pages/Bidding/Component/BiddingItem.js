import React, { useState, useContext } from 'react';
import { Flex, Button, Typography, Tag, Upload } from 'antd';
import DatePickerFormat from './DatePickerFormat';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useApp } from '../../../contexts/appProvider';
import BiddingContext from '../../../contexts/biddingContext';
import { convertBase64 } from '../../../helpers/uploadFile';

const BiddingItem = ({
  title = '',
  tagStatus = {},
  dateField = null,
  documentField = null,
}) => {
  const { data, setData, saving, setDeletedFields } =
    useContext(BiddingContext);
  const { setToast } = useApp();
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
        [field]: JSON.stringify({
          fileBase64: fileBase64,
          fileName: file.name,
        }),
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
          {data[documentField] && !!documentField && !isEditItem && (
            <Button
              disabled={saving}
              style={{ padding: '0px' }}
              type="link"
              href={documentPreview || data[documentField]}
              target="_blank"
            >
              Xem tài liệu
            </Button>
          )}
        </Flex>

        <Button
          disabled={saving}
          type="link"
          onClick={() => setIsEditItem(!isEditItem)}
          style={{ margin: '0px' }}
        >
          {isEditItem ? 'Xác nhận' : 'Cập nhật'}
        </Button>
      </Flex>

      {isEditItem && (
        <Flex vertical justify="right" gap={4} align="start">
          <Typography.Text>Ngày hoàn thành:</Typography.Text>
          <DatePickerFormat field={dateField} />
          {!!documentField && (
            <>
              <Flex gap={4}>
                <Typography.Text>Tài liệu: </Typography.Text>
                {data[documentField] && (
                  <Button
                    disabled={saving}
                    style={{ padding: '0px', margin: '0px' }}
                    type="link"
                    href={documentPreview || data[documentField]}
                    target="_blank"
                  >
                    Xem
                  </Button>
                )}
              </Flex>
              {!!data[documentField] && (
                <Button
                  disabled={saving}
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => {
                    if (!documentPreview) {
                      setDeletedFields((prev) => [...prev, documentField]);
                    }
                    setDocumentPreview(null);
                    setData({
                      ...data,
                      [documentField]: null,
                    });
                  }}
                >
                  Xóa
                </Button>
              )}
              {!data[documentField] && (
                <Upload
                  beforeUpload={() => {
                    return false;
                  }}
                  onChange={(e) => {
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
