import React from 'react';
import './BookingForm.css';

class BookingForm extends React.Component {

    constructor() {
        super(); 
        this.uppdatePrice = this.uppdatePrice.bind(this);
        this.submit = this.submit.bind(this);
        this.close = this.close.bind(this);
        this.maybeClose = this.maybeClose.bind(this);
    }

    async componentDidMount() {
        await this.props.BioApi.wait();
    }

    close() {
        document.getElementById('PopupShadow').click();
        this.props.onClose();
    }

    maybeClose(event) {
        if(event.target.tagName === "FORM") {
            this.close();
        }
    }

    uppdatePrice() {
        const show = this.props.show;
        const ticketCount = +document.getElementById('ticketCount').value;
        const moviePrice = show.seat_price;

        const totalPRice = moviePrice * ticketCount;
        const priceElement = document.getElementById('ticketsPrice');
        console.log(priceElement);

        priceElement.innerText = totalPRice;
    }
    
    async submit(event) {
        event.preventDefault();

        const showId = this.props.show.id;
        const seatCount = +document.getElementById('ticketCount').value;
        const isLogin = this.props.BioApi.islogedin();

        try{
            if(isLogin) {
                await this.props.BioApi.addBookingCurrentUSer(showId, seatCount);
            } else {
                const email = document.getElementById('email').value;
                await this.props.BioApi.addBookingNewUser(showId, seatCount, email);
            }
            
        } catch(error) {
            //const errorJson = JSON.parse(error);
            //console.error("error from BookingForm::submit():", errorJson || error);
            alert("Booking fail");
            return;
        }

        this.close();
        alert("Bookings OK");
    }

    render() {
        const movie = this.props.movie;
        const show = this.props.show;
        const auditorium = show.auditorium;
        const cinema = this.props.BioApi.cinema(auditorium.cinema_id);
        const startDate = new Date(show.start_at);
        const isLogedIn = this.props.BioApi.islogedin();
        const email = this.props.BioApi.email();

        console.log("Email:", email);

        return (
            <form id="BookingForm" onClick={this.maybeClose} onSubmit={this.submit}>
                <div id="Booking">

                    <h3>Book tickets</h3>
                    <p>
                        <strong>{movie.title}</strong>
                        <span>{startDate.toISOString().slice(11,16)} {startDate.toISOString().slice(0,10)}</span>
                        <span>{cinema.name} {auditorium.name}</span>
                        <span>{show.spoken_language} | Subtitle: {show.subtitle_language}</span> 
                    </p>

                    <label>
                        <span>Number of tickets: </span>     
                        <input id="ticketCount" name="ticketCount" type="number" min="1" max="10" onChange={this.uppdatePrice}/>
                        <span>
                            <span id="ticketsPrice">{show.seat_price}</span> SEK
                        </span>
                    </label>

                    <label>
                        <span>Email:</span> 
                        {
                            isLogedIn ?
                            <input id="email" name="email" type="email" value={email} readOnly />:
                            <input id="email" name="email" type="email"/>
                        }
                    </label>

                    <label>
                        <input type="checkbox" value="byRulse" required />
                        <span>I have read and agree with the <a target="_blank" href="/Aggrement.pdf">terms and conditions</a></span>
                    </label>

                    <label>
                        <input type="checkbox" value="byAge" required/>
                        <span>I am 15 years of age or older.</span>
                    </label>

                    <label>
                        <input type="submit" value="validate" />
                    </label>
                    <span id="BookingClose" onClick={this.close}>X</span>
                </div>
            </form>
    );
  }
}

export default BookingForm;
