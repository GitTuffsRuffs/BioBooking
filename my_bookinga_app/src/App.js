//APP Defult window

import React from 'react';
import Header from "./components/Header";
import Movie from "./components/MovieList/Movie";
import Fotter from "./components/Fotter";

function App() {
  return (
    <>
      <Header/>
      <Movie />
      <Fotter />
    </>
  );
}

export default App;
