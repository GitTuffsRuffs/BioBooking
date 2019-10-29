import React from 'react';
import {Redirect} from "react-router-dom";
import './MyBookings.scss';

class MyBookings extends React.Component {

    constructor(props) {
        super(props);
        this.state = { reservations: [] , logedin: false };
        this.loginUppdate = this.loginUppdate.bind(this);
    }

    async componentDidMount() {
        this.props.BioApi.addListener(this.loginUppdate);

        if(this.props.BioApi.islogedin()) {
            this.uppdateReservations();
        }
    }

    async uppdateReservations() {
        //await this.props.BioApi.login('tuffsruffs@gmail.com', 'a');
        let reservations;

        try {
            reservations = await this.props.BioApi.reservations();
            await this.props.BioApi.wait();
        } catch {
            alert("Faild to load reservations");
        }
        console.log("reserv",reservations);
        //TODO: Sort by Date
        if(reservations) {
            reservations = reservations.reverse();
            this.setState({ reservations: reservations });
        }
    }

    loginUppdate(logedin){
        this.setState({logedin});
    }
    
    renderOneBooking(booking){
        const show = booking.show;
        const movie = show.movie;
        const auditorium = this.props.BioApi.auditorium(show.auditorium_id);
        const cinema = this.props.BioApi.cinema(auditorium.cinema_id);
        const movieDate = new Date(show.start_at);
        //console.log({cinema, auditorium, movie, show, booking});

        return(
            <li>
                <img src={movie.image_url} alt="Movie poster" />

                <div>
                    <h3>{movie.title}</h3>
                    <div>
                        <span>{cinema.name} - {auditorium.name} - {booking.show.spoken_language}</span>
                        <span>Seats: {booking.first_seat_number} - {booking.first_seat_number + booking.seat_count - 1}</span>
                    </div>
                    <div>
                        <span>{movieDate.toISOString().slice(11,16)} - {movieDate.toISOString().slice(0,10)}</span>
                        <span>Price: {booking.show.seat_price * booking.seat_count}</span>
                    </div>
                </div>
            </li>
        );
    }

  render() {
    if(!this.props.BioApi.islogedin()) {
        return (
            <Redirect to="/movies" />
        );
    }

    return (
        <>
            <h2>Your Bookings</h2>
            <ul className="Bookinglist">
                {this.state.reservations.map(this.renderOneBooking.bind(this))}
            </ul>
        </>
    );
  }
}

export default MyBookings;
