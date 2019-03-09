import React, { Component, useState, useEffect } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://wfc-2019.firebaseapp.com/images?limit=5&offset=0")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data.images
          });
          console.log(result.data.images);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="App">
        Hello, world
      </div>
    );
  }
}

export default App;
