//Show the info of one movie.
import React from "react";
import { withRouter } from "react-router-dom";
import BookingForm from "./BookingForm";
import DateSort from "./DateSort";
import PopupPortal from "./PopupPortal";
import "./Showings.scss";

class Showings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingShow: null,
      movieid: 0,
      shows: [],
      filterShows: [],
      filterDate: "All",
      filterCinema: "All"
    };
    this.loadShows = this.loadShows.bind(this);
    this.showBooking = this.showBooking.bind(this);
    this.renderOneShow = this.renderOneShow.bind(this);
    this.hideBooking = this.hideBooking.bind(this);
    this.uppdateSort = this.uppdateSort.bind(this);
    this.filterShows = this.filterShows.bind(this);
  }

  async loadShows(movieid) {
    const shows = await this.props.BioApi.shows(movieid);
    const auditoriums = await this.props.BioApi.auditoriums();
    const cinemas = await this.props.BioApi.cinemas();

    for (const show of shows) {
        show.startDate = new Date(show.start_at);
        show.startTime = show.startDate.getTime();
    }

    for (const auditorium of auditoriums) {
      for (const show of shows) {
        if (show.auditorium_id === auditorium.id) {
          show.auditorium = auditorium;
        }
      }
    }

    for (const cinema of cinemas) {
      for (const show of shows) {
        if (show.auditorium.cinema_id === cinema.id) {
          show.cinema = cinema;
        }
      }
    }
    this.setState({ movieid, shows });
    this.state.shows = shows;
    this.filterShows();
  }

  showBooking(event) {
    const showID = +event.currentTarget.getAttribute("data-show-id");
    let show = null;

    for (const currentShow of this.state.shows) {
      if (currentShow.id === showID) {
        show = currentShow;
        break;
      }
    }

    if (show === null) {
      return;
    }

    this.setState({ bookingShow: show });
    const bookingForm = document.getElementById("BookingForm");
    if (bookingForm) {
      bookingForm.style.display = "flex";
    }
    document.getElementById("PopupShadow").style.display = "block";
  }

  hideBooking() {
    this.setState({ bookingShow: null });
  }

  uppdateSort(filter) {
    //console.log("A:", filter);
    this.setState({ filterDate: filter.date, filterCinema: filter.cinema });
    this.state.filterDate = filter.date;
    this.state.filterCinema = filter.cinema;
    this.filterShows();
  }

  filterShows(){
    const filterShows = [];

    var minDate = 0;
    var maxDate = Infinity;

    if(this.state.filterDate === "All"){
        minDate = (new Date(new Date().toDateString())).getTime();
    } else {
        minDate = +this.state.filterDate;
        maxDate = minDate+25*60*60*1000;
    }

    console.log("DateRage:", [minDate, maxDate] );

    for(const show of this.state.shows) {
        //if date
        if(show.startTime < minDate || show.startTime > maxDate) {
            continue;
        }

        console.log("DateMatch:", [minDate, show.startTime, maxDate] );

        //if cinema
        if(this.state.filterCinema !== "All" && +this.state.filterCinema !== show.cinema.id) {
            continue;
        }
        filterShows.push(show);
    }
    this.setState({ filterShows });
  }

  renderOneShow(show) {
    const startDate = show.startDate;

    return (
      <li>
        <span title={startDate.toISOString().slice(0,10)}>
            {startDate.toISOString().slice(11, 16)}<br/>
            {startDate.getDate()}/{startDate.getMonth()+1}
        </span>
        <span>
          <strong>
            {show.cinema.name} {show.auditorium.name}
          </strong>
          <br />
          <span>
            {show.spoken_language} | Subtitle:&nbsp;{show.subtitle_language}
          </span>
        </span>
        <span>
          <span>{show.seats_left} seats left</span>
          <button
            className="BookingButton"
            data-show-id={show.id}
            onClick={this.showBooking}
          >
            Too Booking
          </button>
        </span>
      </li>
    );
  }

  render() {
    const movieid = this.props.match.params.id;

    if (movieid && this.state.movieid !== movieid) {
      this.loadShows(movieid);
    }

    return (
      <>
        <DateSort
          movie={this.props.movie}
          BioApi={this.props.BioApi}
          onChange={this.uppdateSort}
        />
        <ul className="Showlist">{this.state.filterShows.map(this.renderOneShow)}</ul>
        <PopupPortal>
          {this.state.bookingShow !== null ? (
            <BookingForm
              BioApi={this.props.BioApi}
              movie={this.props.movie}
              show={this.state.bookingShow}
              onClose={this.hideBooking}
            />
          ) : (
            ""
          )}
        </PopupPortal>
      </>
    );
  }
}

export default withRouter(Showings);
