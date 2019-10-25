//List all cinemas
import React from 'react';

class Cinemas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: undefined };
  }

  componentDidMount() {
    fetch("http://localhost:54426/api/cinemasEF")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ result: data })
      });
  }

  render() {
    return (
      <>
          <div>
            {this.state.result !== undefined
              ? this.state.result.map(item => (
                  <p>{item.name}</p>
                ))
              : null}
          </div>
      </>
    );
  }
}

export default Cinemas;
