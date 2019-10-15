//APP Defult window
import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';

import Header from './Components/Header';
import ContentBox from './Components/ContectBox';
import BioApi from './Services/BioApi';
import Login from './Components/Login';

class App extends React.Component {
  constructor () {
    super();
    this.api = new BioApi();
    this.state = { pageToDisplay: "HOME" };
  }

  render() {
  return (
    <Router>
      <Header />
      <ContentBox BioApi={this.api} />
      <Login BioApi={this.api} />
    </Router>
  )};
}

export default App;
