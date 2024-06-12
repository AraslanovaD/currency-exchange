import React, { useState } from 'react';
import './add.css';

type Props = {
  courses: object,
  addPair: (newPair: {
    from: string, fromValue: number, fromNominal: number,
    to: string, toValue: number, toNominal: number
  }) => void
}

const Add = ({ courses, addPair }: Props) => {
  const [from, setFrom] = useState<string>("AUD");
  const [to, setTo] = useState<string>("AUD");

  const CreateOptions = () => {
    let allNames: React.JSX.Element[] = [];
    for (var key in courses) {
      if (courses.hasOwnProperty(key)) {
        allNames.push(<option key={key} value={key}>{courses[key].Name}</option>);
      }
    }
    return allNames;
  }

  const allNames = CreateOptions();

  const CreateNewPair = (keyfrom: string, keyto: string) => {
    let newPair = {
      from: courses[keyfrom].Name, fromValue: courses[keyfrom].Value, fromNominal: courses[keyfrom].Nominal,
      to: courses[keyto].Name, toValue: courses[keyto].Value, toNominal: courses[keyto].Nominal
    };
    addPair(newPair);
  }


  return (
    <div>
      <h2>Добавить валюту</h2>
      <div className="add">

        <label className='country'>
          У меня есть
          <select onChange={event => setFrom(event.target.value)}>
            {allNames}
          </select>
        </label>

        <label className='country'>
          Хочу приобрести
          <select onChange={event => setTo(event.target.value)}>
            {allNames}
          </select>
        </label>

        <button onClick={() => { CreateNewPair(from, to) }}>Добавить</button>

      </div>
    </div>
  );
}

export default Add;
