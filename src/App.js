import React, { useState, useEffect } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Observer from '@researchgate/react-intersection-observer';

import PhotoDetail from './PhotoDetail';
import PhotoList from './PhotoList';
import TitleBar from './Component/TitleBar';

const App = () => {
  const [listSize, setListSize] = useState({before: 0, current: 0});
  const [gridSize, setGridSize] = useState(1);
  const [apiStatus, setApiStatus] = useState({isLoaded: false, error: false});
  const [imagesList, setImagesList] = useState([]);
  const [currentDetailStatus, setCurrentDetailStatus] = useState({id: null, imageInfo: {}});
  useEffect(() => {
    const url = 'https://wfc-2019.firebaseapp.com/images?'
      + 'offset=' + String(listSize.before)
      + '&limit=' + String(listSize.current - listSize.before);
    console.log('started fetch');
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if(response.ok) {
          setImagesList([...imagesList, ...response.data.images]);
          setApiStatus({...apiStatus, isLoaded: true, error: false});
        } else {
          setApiStatus({...apiStatus, isLoaded: true, error: true});
          console.log('response is not ok.');
        }
      },
      (error) => {
        setApiStatus({...apiStatus, isLoaded: true, error: true});
        console.log(error);
      });
  }, [listSize]);

  function onLinkClick(id) {
    setCurrentDetailStatus({id: id, imageInfo: imagesList.find(elem => elem.id === id)});
  }

  function gainListSize(size) {
    setListSize({before: listSize.current, current: listSize.current + size});
  }

  function handleIntersection() {
    gainListSize(50);
  }

  const intersectionOption = {
    onChange: handleIntersection,
  }

  return (
    <HashRouter>
      <div>
        <TitleBar setGridSize={setGridSize} />
        <div style={{height: '75px'}}></div>
        <PhotoList imagesList={imagesList} onLinkClick={onLinkClick} gridSize={gridSize} />
        {apiStatus.isLoaded ? false : <div>Loading...</div>}
        {apiStatus.error ? <div>再度読み込みしてね</div> : false}
        <Observer {...intersectionOption}>
        <div></div>
        </Observer>

        <Route path='/detail/:id' render={(props) => (
          <PhotoDetail {...props} image={currentDetailStatus.imageInfo} />
        )} />
      </div>
    </HashRouter>
  );
}

export default App;