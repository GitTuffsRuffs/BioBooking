import React from 'react';
import {Redirect,Route, Switch} from "react-router-dom";
import Movies from './Movies';
import Movie from './Movie';
import Info from './Info';

class ContentBox extends React.Component {
    render() {
    return (
        <div id="ContentBox">
            <Switch>
                <Redirect exact from ="/" to ="/movies"/>
                
                <Route path="/movies">
                    <Movies BioApi={this.props.BioApi} />
                </Route>
                <Route path="/movie/:id">
                    <Movie BioApi={this.props.BioApi} />
                </Route>

                <Route path="/info">
                    <Info />
                </Route>
                <Route>404</Route>
            </Switch>
        </div>
    );}
}

export default ContentBox;