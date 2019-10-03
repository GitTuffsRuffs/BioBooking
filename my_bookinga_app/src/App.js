//APP Defult window
import React from 'react';
import Header from './Components/Header';

import DateSort from './Components/DateSort';
import Movies from './Components/Movies';

import './App.css';

function App() {
  return (
    <>
      <Header/>
      <div id="ContentBox">
        <DateSort />
        <Movies />
      </div>
    </>
  );
}

export default App;
