import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import PhotoDetail from './PhotoDetail';
import PhotoList from './PhotoList';
import TitleBar from './Component/TitleBar';
import './animation.css';

const App = () => {
  const [listSize, setListSize] = useState({before: 0, current: 20});
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

  return (
    <BrowserRouter>
      <div>
        <TitleBar setGridSize={setGridSize} />
        <div style={{height: '70px'}}></div>
        <PhotoList imagesList={imagesList} onLinkClick={onLinkClick} gridSize={gridSize} />
        {apiStatus.isLoaded ? false : <div>Loading...</div>}
        {apiStatus.error ? <div>再度読み込みしてね</div> : false}
        <button onClick={() => gainListSize(10)}>もっと読み込む</button>

        <Route path='/detail/:id' render={(props) => (
          <PhotoDetail {...props} image={currentDetailStatus.imageInfo} />
        )} />
      </div>
    </BrowserRouter>
  );
}

export default App;