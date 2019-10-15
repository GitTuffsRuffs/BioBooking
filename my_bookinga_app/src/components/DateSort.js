//Sort movies on Today, Tomorrow and next day...
import React from 'react';
import './DateSort.css';

class DateSort extends React.Component {
    render() {
        return (
            <div id="DateSort">
                <div>
                <select>
                    <option value="Monday">Date: All</option>
                    <option value="Monday">Date: Idag</option>
                    <option value="Monday">Date: Imorgon</option>
                    <option value="Monday">Date: Next</option>
                </select>

                <select>
                    <option value="Cinema1">All Cinemas</option>
                    <option value="Cinema1">Cinema 1</option>
                    <option value="Cinema2">Cinema 2</option>
                </select>

                <select>
                    <option value="baby">Age: All</option>
                    <option value="baby">Age: 0-6</option>
                    <option value="kid">Age: 7-15</option>
                </select>
                </div>
            </div>
        );
    }
}

export default DateSort;