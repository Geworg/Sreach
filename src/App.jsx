import React from 'react';
import './App.css';
import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState([])
  const [displey, setDispley] = useState(false)
  const appRef = useRef(null)

  const handleClickOutSide = (event) => {
    if (appRef.current && !appRef.current.contains(event.target)) {
      setDispley(false);
    }
  };

  const update = (title) => {
    let str = title.split('').splice(0, 4).join('') + '...';
    setSearch(str);
    setDispley(false);
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutSide)
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=25&#39')
      .then(response => response.json())
      .then(json => setData(json))
  }, [])

  return (
    <div className='App' ref={appRef}>
      <input type="text"
        placeholder='Search'
        value={search}
        onChange={e => setSearch(e.target.value)}
        onClick={() => setDispley(true)}
      />
      <div className='container'>
        {displey && data
          .filter(el => el.title.includes(search))
          .map(el =>
            <div className="item" key={el.id} onClick={() => update(el.title)}>
              <span>{el.title}</span>
              <img src={el.thumbnailUrl} alt="" width='20px' height="20px" />
            </div>
          )}
      </div>
    </div>
  )
}