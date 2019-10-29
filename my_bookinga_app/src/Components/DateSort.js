//Sort movies on Today, Tomorrow and next day...
import React from 'react';
import './DateSort.scss';

class DateSort extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cinemas: [] };
        this.uppdateSort = this.uppdateSort.bind(this);
    }

    async componentDidMount() {
        const cinemas = await this.props.BioApi.cinemas();
        this.setState({ cinemas });
    }

    uppdateSort() {
        const filter = {};
        filter.date = document.getElementById("Filterdate").value;
        filter.cinema = document.getElementById("Filtercinema").value;
        filter.age = document.getElementById("Filterage").value;

        this.props.onChange(filter);
    }

    render() {
        const dateOptions = [
            (<option value="All">Date: All</option>)
        ];

        const startdate = new Date(new Date().toDateString());
        dateOptions.push((<option value={startdate.getTime()}>Today: {startdate.getDate()}/{startdate.getMonth()+1}</option>));

        var loopDate = new Date(startdate);
        loopDate.setDate(loopDate.getDate()+1);
        dateOptions.push((<option value={loopDate.getTime()}>Tomorrow: {loopDate.getDate()}/{loopDate.getMonth()+1}</option>));

        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        for(var i = 0; i <= 5; i++) {
            loopDate.setDate(loopDate.getDate()+1);
            dateOptions.push((<option value={loopDate.getTime()}>{weekdays[loopDate.getDay()]}: {loopDate.getDate()}/{loopDate.getMonth()+1}</option>));
        }

        const cinemaOptions = [
            (<option value="All">All Cinemas</option>),
        ];

        for(const cinema of this.state.cinemas) {
            cinemaOptions.push(
                (<option value={cinema.id}>{cinema.name}</option>)
            )
        }

        let ageOptions = [
            (<option value="baby">Age: All</option>),
            (<option value="baby">Age: 0-6</option>),
            (<option value="kid">Age: 7-15</option>)
        ];

        if(this.props.movie != null) {
            ageOptions = [
                (<option value="baby">Age: {this.props.movie.age_limit}</option>)
            ];
        }

        return (
            <div className="DateSort">
                <div>
                <select id="Filterdate" onChange={this.uppdateSort}>
                    {dateOptions}
                </select>

                <select id="Filtercinema" onChange={this.uppdateSort}>
                    {cinemaOptions}
                </select>

                <select id="Filterage" onChange={this.uppdateSort}>
                    {ageOptions}
                </select>
                </div>
            </div>
        );
    }
}

export default DateSort;