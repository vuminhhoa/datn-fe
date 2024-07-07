import React from 'react';
import Page from '../../components/Page/Page.js';
import BiddingChart from './BiddingChart.js';
import Activities from './Activities.js';
import Summary from './Summary.js';

function Home() {
  return (
    <Page>
      <Summary />
      <BiddingChart />
      <Activities />
    </Page>
  );
}

export default Home;
