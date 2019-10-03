//Sort movies on Today, Tomorrow and next day...
import React from 'react';
import './DateSort.css';

class DateSort extends React.Component {
    render() {
        return (
            <div id="DateSort">
                <select className="inputs">
                    <option value="Monday">Date - Idag</option>
                    <option value="Monday">Date - Imorgon</option>
                    <option value="Monday">Date - Next</option>
                </select>

                <select className="inputs">
                    <option value="Cinema1">Cinema1</option>
                    <option value="Cinema2">Cinema2</option>
                </select>

                <select className="inputs">
                    <option value="baby">Age: 0-6</option>
                    <option value="kid">Age: 7-15</option>
                </select>
            </div>
        );
    }
}

export default DateSort;