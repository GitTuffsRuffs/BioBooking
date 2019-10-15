import React from 'react';
import {Route, Switch} from "react-router-dom";
import Movies from './Movies';
import Info from './Info';
import Login from './Login';

class ContentBox extends React.Component {
    render() {
    return (
        <div id="ContentBox">
            <Switch>
                <Route path="/movies">
                    <Movies />
                </Route>
                <Route path="/info">
                    <Info />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route>404</Route>
            </Switch>
        </div>
    );}
}

export default ContentBox;