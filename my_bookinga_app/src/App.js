//APP Defult window
import React from 'react';
import Header from './Components/Header';

import DateSort from './Components/DateSort';
import Movies from './Components/Movies';


function App() {
  return (
    <>
      <Header/>
      <>
      <DateSort />
      <Movies />
      </>
    </>
  );
}

export default App;
