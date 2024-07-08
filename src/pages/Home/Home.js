import React from 'react';
import Page from '../../components/Page/Page.js';
import BiddingChart from './BiddingChart.js';
import Activities from './Activities.js';
import Summary from './Summary.js';
import useFetchApi from '../../hooks/useFetchApi.js';

function Home() {
  const { data, loading, setData } = useFetchApi({
    url: `/dashboard`,
    defaultData: {},
  });
  return (
    <Page>
      <Summary data={data} loading={loading} setData={setData} />
      <BiddingChart />
      <Activities data={data} loading={loading} setData={setData} />
    </Page>
  );
}

export default Home;
