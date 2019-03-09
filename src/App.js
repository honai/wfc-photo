import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import PhotoDetail from './PhotoDetail';
import './style.css';
// import PhotoList from './PhotoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: []
    };
  }

  componentDidMount() {
    fetch("https://wfc-2019.firebaseapp.com/images?limit=10&offset=0")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            images: result.data.images
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, images } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <BrowserRouter>
          <div>
            <div className='photos-wrap'>
              {images.map(image => (
                <div className='item' key={image.id}>
                  <Link to={`/detail/${image.id}`}>
                    <img src={image.url} width='100%' />
                  </Link>
                </div>
              ))}
            </div>

            <Route path='/detail/:id' component={PhotoDetail} />
          </div>
        </BrowserRouter>
      );
    }
  }
}
export default App;
