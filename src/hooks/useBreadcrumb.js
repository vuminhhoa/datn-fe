import { useNavigate } from 'react-router-dom';
import { Button, Breadcrumb } from 'antd';
import React from 'react';
import { HomeOutlined } from '@ant-design/icons';

export const useBreadcrumb = (items, useComponent = false) => {
  const navigate = useNavigate();

  const homeItem = { title: <HomeOutlined />, path: '/' };
  const hasHome = items.some((item) => item.path === '/');

  const updatedItems = hasHome ? items : [homeItem, ...items];

  const newItems = updatedItems.map((item) => {
    return {
      onClick: () => navigate(item.path),
      title: (
        <Button
          type="text"
          style={{
            padding: '0px',
            paddingInline: '2px',
            border: '0px',
            color: '#00000073',
            height: 'auto',
          }}
        >
          {item.title}
        </Button>
      ),
    };
  });

  if (useComponent) {
    return <Breadcrumb items={newItems} />;
  }

  return newItems;
};
