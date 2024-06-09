import React from 'react';
import { Flex } from 'antd';

const Page = ({ children, fullWidth = false }) => {
  return (
    <Flex
      vertical
      gap={16}
      style={{ width: '100%', maxWidth: fullWidth ? '100%' : '800px' }}
    >
      {children}
    </Flex>
  );
};

export default Page;
