import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';
import PhotoDetail from './PhotoDetail';
import PhotoList from './PhotoList';
import './animation.css';

const App = () => {
  const [getRange, setGetRange] = useState({limit: 10, offset: 0});
  const [apiStatus, setApiStatus] = useState({isLoaded: false, error: false});
  const [imagesList, setImagesList] = useState([]);
  const [currentDetailStatus, setCurrentDetailStatus] = useState({id: null, imageInfo: {}});
  // const fetchImageList = async (limit, offset) => {
  //   const url = 'https://wfc-2019.firebaseapp.com/images?'
  //     + 'limit=' + String(limit)
  //     + 'offset' + String(offset);
  //   try {
  //     const response = await fetch(url);
  //     return response.json();
  //   } catch(e) {
  //     console.log('Error!');
  //   }
  // }
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
            setApiStatus({...apiStatus, isLoaded: true, error: true});
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setApiStatus({...apiStatus, isLoaded: true, error: true});
        }
      )
  }, getRange)

  function onLinkClick(id) {
    setCurrentDetailStatus({id: id, imageInfo: imagesList.find(elem => elem.id === id)});
  }
  
  if (apiStatus.error) {
    return <div>再度読み込みしてね</div>;
  } else if (!apiStatus.isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <BrowserRouter>
        <div>
          <div><h3>フォト</h3></div>
          <PhotoList imagesList={imagesList} onLinkClick={onLinkClick} />

          <Route path='/detail/:id' render={(props) => (
            <PhotoDetail {...props} image={currentDetailStatus.imageInfo} />
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;