//Show the info of one movie.
import React from "react";
import {withRouter} from "react-router-dom";
import BookingForm from "./BookingForm";
import DateSort from "./DateSort";
import PopupPortal from "./PopupPortal";
import './Showings.css';

class Showings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {bookingShowId: 0, movieid: 0, shows: []};
        this.loadShows = this.loadShows.bind(this);
        this.showBooking = this.showBooking.bind(this);
        this.renderOneShow = this.renderOneShow.bind(this);
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

    showBooking() {
        this.setState({ bookingShowId: 1 });
        const bookingForm = document.getElementById('BookingForm');
        if(bookingForm) {
            bookingForm.style.display='flex';
        }
        document.getElementById('PopupShadow').style.display='block';
        console.log("Header Booking");
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
                    {show.seats_left} seats left <button className="BookingButton" onClick={this.showBooking}>Too Booking</button>
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
                    {this.state.shows.map(this.renderOneShow)}
                </ul>
                <PopupPortal>
                    {this.state.bookingShowId > 0 ? (<BookingForm />) : ""}
                </PopupPortal>
            </>      
        );
    }
}

export default withRouter(Showings);