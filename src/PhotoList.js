import React from 'react';
import { Link } from 'react-router-dom';
import './PhotoList.css';

const PhotoList = ({imagesList, onLinkClick}) => (
  <div className='photos-wrap'>
    {imagesList.map(image => (
      <div className='item' key={image.id}>
        <Link to={`/detail/${image.id}`} onClick={() => onLinkClick(image.id)}>
          <img src={image.url} width='100%' alt={image.description} />
        </Link>
      </div>
    ))}
  </div>
);

export default PhotoList;