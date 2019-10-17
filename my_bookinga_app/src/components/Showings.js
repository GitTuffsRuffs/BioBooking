//Show the info of one movie.
import React from "react";
import {withRouter} from "react-router-dom";
import DateSort from "./DateSort";
import './Showings.css';

class Showings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {movieid: 0, shows: []};
    }
    
    async loadShows(movieid) {
        const shows = await this.props.BioApi.shows(movieid);
        console.log("A", shows);
        const auditoriums = await this.props.BioApi.auditoriums();
        for(const auditorium of auditoriums) {
            for(const show of shows) {
                if(show.auditorium_id === auditorium.id) {
                    show.auditorium = auditorium;
                }
            }
        }
        console.log(shows);
        this.setState({ movieid, shows });
    }

    renderOneShow(show){
        const startDate = new Date(show.start_at);

        return (
            <li>
                <span>
                {startDate.toISOString().slice(11,16)}
                </span>
                <span>
                    <strong>{show.auditorium.name}</strong><br/>
                    <span>{show.spoken_language} | Subtitle: {show.subtitle_language}</span> 
                </span>
                <span>
                    {show.seats_left} platser kvar <button className="BookingButton">Till bokning</button>
                </span>
            </li>
        );
      };


    render() {
        const movieid = this.props.match.params.id;

        if(movieid && this.state.movieid !== movieid) {
            this.loadShows(movieid);
        }

        return (
            <>
                <DateSort movie={this.props.movie} BioApi={this.props.BioApi} />
                <ul className="Showlist">
                    {this.state.shows.map(this.renderOneShow.bind(this))}
                </ul>
            </>      
        );
    }
}

export default withRouter(Showings);