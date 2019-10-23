//Show the info of one movie.
import React from "react";
import {withRouter} from "react-router-dom";
import Showings from "./Showings";
import './Movie.css';

class Movie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {movieid: 0, movie: null };
    }
    
    async loadMovie(id) {
        const movie = await this.props.BioApi.movie(id);
        this.setState({ movieid: id, movie })
    }
    
    render() {
        const movieid = this.props.match.params.id;

        if(movieid && this.state.movieid !== movieid) {
            this.loadMovie(movieid);
        }

        if(!this.state.movie){ 
            return (
                <p>Loading</p>
            );
        }

        return (
            <>
                <div id="MovieInfo">
                    <img id="MovePicture" alt="movie poster" src={this.state.movie.image_url} />
                    
                    <div id="MovieTitle">
                        <h1>{this.state.movie.title}</h1>
                        <label>
                            Age: {this.state.movie.age_limit} |&nbsp;
                            Time: {this.state.movie.length} |&nbsp;
                            {this.state.movie.language} |&nbsp;
                            {this.state.movie.category}
                        </label>
                    </div>                    
                </div>

                <div id="MovieText">
                    {this.state.movie.description}
                </div>
                
                <Showings movie={this.state.movie} BioApi={this.props.BioApi}/>
            </>
        );
    }
}

export default withRouter(Movie);
