//Show the info of one movie.

import React from "react";

class Movie extends React.Component {
    render() {
        return (
            <>
                <div id="MovieInfo">
                    <img id="MovePicture" alt="P" src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png" />
                </div>

                <div id="MovieTitle">
                    Movie Title<br/>
                    Title, Age, Time, Langues
                </div>

                <div id="MovieText">
                    Describing text of movie
                    <br/>apa
                    <br/>apa
                    <br/>apa
                </div>
                
                <div id="MoveShowings">
                    Showings of movie!
                </div>
            </>
      
        );
    }
}

export default Movie;
