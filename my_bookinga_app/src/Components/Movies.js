//List all movies that is showing right now.

//APP Defult window
import React from 'react';
import {Link} from "react-router-dom";
import DateSort from './DateSort';

import './Movies.scss';

class Movies extends React.Component {

  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  async componentDidMount() {
    const movies = await this.props.BioApi.movies();
    this.setState({ movies });
  }

  renderOneMoive(movie){
    return (
      <div className="MovieHolder">
        <div>
          <img src={movie.image_url} alt="Movie poster" onClick={(event) => event.currentTarget.parentElement.parentElement.children[1].click()} />
        </div>
        <Link to={"/movie/"+movie.id}>{movie.title}</Link>
      </div>
    );
  }

  render() {
    return (
      <>
        <DateSort movie={null} BioApi={this.props.BioApi} />
        <div className="MovieGrid">
            {this.state.movies.map(this.renderOneMoive)}
        </div>
      </>
    );
  }
}

export default Movies;
