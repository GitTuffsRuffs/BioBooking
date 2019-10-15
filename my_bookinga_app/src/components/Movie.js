//Show the info of one movie.
import React from "react";
import {withRouter} from "react-router-dom";
import Showings from "./Showings";

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
                </div>

                <div id="MovieTitle">
                    <h1>{this.state.movie.title}</h1>
                    <span>
                        Age: {this.state.movie.age_limit} | 
                        Time: {this.state.movie.length} | 
                        {this.state.movie.language} | 
                        {this.state.movie.category}
                    </span>
                </div>

                <div id="MovieText">
                    <p>{this.state.movie.description}</p>
                </div>
                
                <Showings BioApi={this.props.BioApi}/>
            </>
      
        );
    }
}

export default withRouter(Movie);
