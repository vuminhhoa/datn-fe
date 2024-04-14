import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';

const DatePickerFormat = ({ field, maxDate = null }) => {
  const { data, setData } = useContext(BiddingContext);
  const dateStr = data[field];
  const isValidDate = dayjs(dateStr, 'DD/MM/YYYY', true).isValid();
  const dateValue = isValidDate ? dayjs(dateStr, 'DD/MM/YYYY') : undefined;

  return (
    <DatePicker
      maxDate={maxDate}
      value={dateValue}
      format={'DD/MM/YYYY'}
      onChange={(_, val) => {
        console.log(val);
        setData({
          ...data,
          [field]: val,
        });
      }}
    />
  );
};

export default DatePickerFormat;
