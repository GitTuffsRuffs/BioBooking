//APP Defult window
import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './App.scss';

import Header from './Components/Header';
import ContentBox from './Components/ContectBox';
import BioApi from './Services/BioApi';
import Popup from './Components/Popup';

class App extends React.Component {
  constructor () {
    super();
    this.api = new BioApi();
    this.state = { pageToDisplay: "HOME" };
  }

  render() {
  return (
    <Router>
      <Header Logedin={true} BioApi={this.api} />
      <ContentBox BioApi={this.api} />
      <Popup BioApi={this.api} />
    </Router>
  )};
}

export default App;
