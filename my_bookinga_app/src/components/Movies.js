//List all movies that is showing right now.

//APP Defult window
import React from 'react';
import {Link} from "react-router-dom";
import DateSort from './DateSort';

import './Movies.css';

class Movies extends React.Component {

  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  componentDidMount() {
    fetch("http://localhost:54426/api/movies")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ movies: data })
      });
  }

  renderOneMoive(movie){
    return (
      <div className="MovieHolder">
        <div id="ThisMovie">
          <img alt="Movie poster" onClick={(event) => event.currentTarget.parentElement.parentElement.children[1].click()} />
        </div>
        <Link to={"/movie/"+movie.id}>{movie.title}</Link>
      </div>
    );
  };

  render() {
    return (
      <>
        <DateSort />
        <div className="MovieGrid">
            {this.state.movies.map(this.renderOneMoive)}
        </div>
      </>
    );
  }
}

export default Movies;
