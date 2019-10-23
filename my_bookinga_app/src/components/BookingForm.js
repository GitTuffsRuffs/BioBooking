import React from 'react';
import './BookingForm.css';

class BookingForm extends React.Component {

    close() {
        document.getElementById('PopupShadow').click();
    }

    maybeClose(event) {
        if(event.target.tagName === "FORM") {
            document.getElementById('PopupShadow').click();
        } else {
            event.preventDefault();
        }
    }
    
    render() {
        return (
            <form id="BookingForm" onClick={this.maybeClose}>
                <div id="Booking">
                    <label>
                        <span>Bio film</span>
                        <span>Bild Title - tid plats dag info</span>
                    </label>

                    <label>
                        <span>Antal biljeter</span>     
                        <input type="number" min="1" max="100"></input>
                        <span>välj antal visa pris</span>
                    </label>

                    <label>
                        <span>välj platser?</span>
                    </label>

                    <label>
                        <span>Din mail (om inloggad auto fyll)</span>
                        <input type="email"></input>
                    </label>

                    <label>
                        <input type="checkbox" value="byRulse"></input>
                        <span>Cheek box "köpvilkor"</span>
                        <input type="checkbox" value="byAge"></input>
                        <span>Cheek box jag är över 15.</span>
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
