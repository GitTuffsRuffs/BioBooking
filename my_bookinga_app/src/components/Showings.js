//Show the info of one movie.
import React from "react";
import {withRouter} from "react-router-dom";

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
                {startDate.toISOString().slice(11,16)} - &nbsp;
                {startDate.getDate()}/
                {startDate.getMonth()} 
                </span>
                <br/>
                <span>
                    {show.auditorium.name} | 
                    {show.subtitle_language} | 
                    {show.spoken_language} | 
                </span>
                <span>
                    {show.seats_left} platser kvar
                    <button>Till bokning</button>
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
                <select className="inputs">
                    <option value="Monday">Date: All</option>
                    <option value="T">Date: Idag</option>
                    <option value="O">Date: Imorgon</option>
                    <option value="Tors">Date: Next</option>
                </select>

                <select className="inputs">
                    <option value="Cin1">All Cinemas</option>
                    <option value="Cinema1">Cinema 1</option>
                    <option value="Cinema2">Cinema 2</option>
                </select>

                <ul className="Showlist">
                    {this.state.shows.map(this.renderOneShow.bind(this))}
                </ul>
            </>      
        );
    }
}

export default withRouter(Showings);