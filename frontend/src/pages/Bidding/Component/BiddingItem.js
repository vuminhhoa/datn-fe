import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';
import {
  Flex,
  Button,
  Typography,
  DatePicker,
  Timeline,
  Tag,
  Select,
  Upload,
} from 'antd';
import { SmileOutlined, UploadOutlined } from '@ant-design/icons';
import BiddingContext from '../../../contexts/biddingContext';
import DatePickerFormat from './DatePickerFormat';

const BiddingItem = ({
  title = '',
  tags = ['Dã có', 'Chưa có', 'Chưa cập nhật'],
  field = '',
}) => {
  const { data } = useContext(BiddingContext);

  const [isEditItem, setIsEditItem] = useState(false);

  return (
    <Flex vertical gap={8}>
      <Flex align="flex-start" gap={8} justify="space-between">
        <Typography.Text>
          {title} {data[field] && <Tag color="success">{tags[0]}</Tag>}
          {data[field] === '' && <Tag color="warning">{tags[1]}</Tag>}
          {data[field] === null && <Tag color="default">{tags[2]}</Tag>}
        </Typography.Text>

        <Button type="link" onClick={() => setIsEditItem(!isEditItem)}>
          {isEditItem ? 'Xác nhận' : 'Cập nhật'}
        </Button>
      </Flex>

      {isEditItem && (
        <Flex vertical justify="right" gap={8}>
          <Flex gap={8} align="center">
            <Typography.Text>Ngày nộp:</Typography.Text>
            <DatePickerFormat field={field} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default BiddingItem;
