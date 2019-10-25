import React from "react";

class AddMovie extends React.Component {

    render() {
        return (
            <div id="AddMovie">
                <form action="/addMovie">
                    Movie title: <input type="text" name="movietitle"/><br/>
                    Movie imdb tag: <input type="text" name="movietag"/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default AddMovie;
