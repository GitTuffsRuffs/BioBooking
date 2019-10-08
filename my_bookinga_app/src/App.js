//APP Defult window
import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';

import Header from './Components/Header';
import ContentBox from './Components/ContectBox';

class App extends React.Component {
  constructor () {
    super();
    this.state = { pageToDisplay: "HOME" };
  }

  render() {
  return (
    <Router>
      <Header />
      <ContentBox />
    </Router>
  )};
}

export default App;
