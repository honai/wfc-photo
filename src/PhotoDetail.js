import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './detail.css';

const PhotoDetail = (props) => {
  const { id } = props.match.params;
  const [image, setImages] = useState(props.image);
  useEffect(() => {
    fetch('https://wfc-2019.firebaseapp.com/image/' + id)
      .then(response => response.json())
      .then(response => {
        if(response.ok) {
          setImages(response.data);
        }
      })
  }, [id]);

  return (
    <div className='photo-detail'>
      <Link to='/'>
        <div className='close-button'><i className="material-icons">close</i></div>
      </Link>
      <div className='photo'>
        <img src={image.url} />
      </div>
    </div>
  )
}

export default PhotoDetail;