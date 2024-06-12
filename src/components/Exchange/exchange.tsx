import React, { useState } from 'react';
import './exchange.css';
import cross from './cross.svg';
import arrows from './arrows.svg';

type Props = {
  index: number,
  to: string;
  from: string;
  deletePair: (index: number) => void,
  swapPair: (index: number) => void,
  calculateCourseExchange: (index: number) => number
}

const Exchange = ({ index, from, to, deletePair, swapPair, calculateCourseExchange }: Props) => {
  const [currencyCount, setCurrencyCount] = useState<number>(1);
  const [currencyResult, setCurrencyResult] = useState<number>(+(currencyCount * calculateCourseExchange(index)).toFixed(2));

  const HandleCurrencyChange = (event) => {
    setCurrencyCount(event.target.value);
    setCurrencyResult(+((event.target.value * calculateCourseExchange(index)).toFixed(2)));
  }

  const HandleCurrencySwap = (index) => {
    let temp = currencyCount;
    setCurrencyCount(currencyResult);
    setCurrencyResult(temp);
    swapPair(index);
  }

  return (
    <div className='exchange'>

      <label className='currency'>
        {from}
        <input type='number' min='0' value={currencyCount} onChange={HandleCurrencyChange} />
      </label>

      <img src={arrows} alt='Поменять местами' className='swap' onClick={() => HandleCurrencySwap(index)} />

      <label className='currency'>
        {to}
        <input type='number' min='0' value={currencyResult} disabled />
      </label>

      <img src={cross} alt='Удалить' className='btn' onClick={() => deletePair(index)} />

    </div>
  );
}
export default Exchange;
