import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';

const DatePickerFormat = ({ obj, field, maxDate = null }) => {
  const { data, setData, saving } = useContext(BiddingContext);
  const input = data[obj];
  const dateStr = input[field];
  const isValidDate = dayjs(dateStr, 'DD/MM/YYYY', true).isValid();
  const dateValue = isValidDate ? dayjs(dateStr, 'DD/MM/YYYY') : undefined;

  return (
    <DatePicker
      maxDate={maxDate}
      value={dateValue}
      disabled={saving}
      format={'DD/MM/YYYY'}
      onChange={(_, val) => {
        setData({
          ...data,
          [obj]: {
            ...data[obj],
            [field]: val,
          },
        });
      }}
    />
  );
};

export default DatePickerFormat;
