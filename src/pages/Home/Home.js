import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div>Hello world</div>
      <Button onClick={() => navigate('profile')}>clieck mi</Button>
    </>
  );
}

export default Home;
