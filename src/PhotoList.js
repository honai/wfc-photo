import React from 'react';
import { Link } from 'react-router-dom';

const PhotoList = ({images}) => (
  <div className='photos-wrap'>
    {images.map(image => (
      <div className='item' key={image.id}>
        <Link to={`/detail/${image.id}`}>
          <img src={image.url} width='100%' />
        </Link>
      </div>
    ))}
  </div>
);

export default PhotoList;