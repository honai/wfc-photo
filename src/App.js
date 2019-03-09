import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import PhotoDetail from './PhotoDetail';
import './style.css';
import PhotoList from './PhotoList';

const App = () => {
  const [getRange, setGetRange] = useState({limit: 10, offset: 0});
  const [imagesList, setImagesList] = useState([]);
  const [apiStatus, setApiStatus] = useState({isLoaded: false, error: null});
  useEffect(() => {
    const url = 'https://wfc-2019.firebaseapp.com/images?'
      + 'limit=' + String(getRange.limit)
      + 'offset' + String(getRange.offset);
    fetch(url)
      .then(response => response.json())
      .then(response => {
          if(response.ok) {
            setImagesList(response.data.images);
            setApiStatus({...apiStatus, isLoaded: true});
          } else {
            console.log('response is not ok.')
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setApiStatus({...apiStatus, isLoaded: true, error: error});
        }
      )
  }, getRange)
  
  if (apiStatus.error) {
    return <div>Error: {apiStatus.error.message}</div>;
  } else if (!apiStatus.isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <BrowserRouter>
        <div>
          <PhotoList images={imagesList} />
          <Route path='/detail/:id' component={PhotoDetail} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
