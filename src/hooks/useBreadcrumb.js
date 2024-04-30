import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import React from 'react';

export const useBreadcrumb = (items) => {
  const navigate = useNavigate();
  return items.map((item) => {
    return {
      onClick: () => navigate(item.href),
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
};
