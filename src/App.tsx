import React, { useEffect, useState } from 'react';
import './App.css';
import Exchange from './components/Exchange/exchange.tsx';
import Add from './components/Add/add.tsx';
import { observer } from 'mobx-react-lite';
import currencyPairsStore from './stores/currency-pairs-store.tsx';

const App = observer(() => {
  const { currencyPairs, addPair, deletePair, swapPair, calculateCourseExchange, setPairs, setDefaultPairs } = currencyPairsStore;
  const [courses, setCourses] = useState<object>({});
  const [isLoading, setIsLoading] = useState(true)

  const URL = 'https://www.cbr-xml-daily.ru/daily_json.js';
  const storageKey = 'currencyExchange'

  const fetchCourses = async () => {
    try {
      const response = await fetch(URL);
      let data = await response.json()

      let coursesData = data.Valute;
      coursesData.RUB = {
        "ID": "R00000",
        "NumCode": "643",
        "CharCode": "RUB",
        "Nominal": 1,
        "Name": "Российский рубль",
        "Value": 1,
        "Previous": 1
      }
      setCourses(coursesData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      let storage = window.localStorage.getItem(storageKey);
      if (storage) {
        setPairs();
      } else {
        setDefaultPairs(courses);
      }
    }
  }, [isLoading])

  return (
    <div className='app'>

      <h1>Курс валют</h1>

      <div className='allExchanges'>
        {currencyPairs.map((pair, index) => {
          return (
            <Exchange
              key={index}
              index={index}
              from={pair.from}
              to={pair.to}
              deletePair={deletePair}
              swapPair={swapPair}
              calculateCourseExchange={calculateCourseExchange}
            />
          );
        })}
      </div>

      <Add addPair={addPair} courses={courses} />

    </div>
  );
})

export default App;
