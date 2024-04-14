import React, { useState } from 'react';
import { Flex, Typography, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

const CollapsibleForm = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Flex vertical gap={16}>
      <Flex justify="space-between">
        <Typography.Text strong>{title}</Typography.Text>
        <Button
          size="small"
          type="link"
          icon={isCollapsed ? <DownOutlined /> : <UpOutlined />}
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      </Flex>
      {!isCollapsed && children}
    </Flex>
  );
};

export default CollapsibleForm;
