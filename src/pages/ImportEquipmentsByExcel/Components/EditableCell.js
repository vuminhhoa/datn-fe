import React from 'react';
import { Input, Form } from 'antd';

export const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Vui lòng nhập ${title.toLowerCase()}!`,
            },
          ]}
          initialValue={record[dataIndex]} // Ensure initialValue is used here
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
