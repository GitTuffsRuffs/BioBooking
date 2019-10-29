//Sort movies on Today, Tomorrow and next day...
import React from 'react';
import './DateSort.scss';

class DateSort extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cinemas: [] };
    }

    async componentDidMount() {
        const cinemas = await this.props.BioApi.cinemas();
        this.setState({ cinemas });
    }

    render() {
        const dateOptions = [
            (<option value="All">Date: All</option>),
            (<option value="Monday">Date: Idag</option>),
            (<option value="Monday">Date: Imorgon</option>),
            (<option value="Monday">Date: Next</option>)
        ];

        const cinemaOptions = [
            (<option value="CinemaAll">All Cinemas</option>),
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
                <select>
                    {dateOptions}
                </select>

                <select>
                    {cinemaOptions}
                </select>

                <select>
                    {ageOptions}
                </select>
                </div>
            </div>
        );
    }
}

export default DateSort;