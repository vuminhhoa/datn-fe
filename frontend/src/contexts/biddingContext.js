import { createContext, useContext } from 'react';

const BiddingContext = createContext({});

export const useSpeedUpContext = () => useContext(BiddingContext);

export default BiddingContext;
