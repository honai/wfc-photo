import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LazyLoad from 'react-lazyload';
// import InfiniteScroll from 'react-infinite-scroller';


import './PhotoList.css';

const PhotoList = ({imagesList, onLinkClick, gridSize, loadMore}) => {
  const columnsDef = [6, 4, 3, 2, 1, 1, 1];
  return (
    <div className='photos-wrap'>
      <Grid container spacing={8}>
          {imagesList.map(image => (
            <Grid item className='grid-item' key={image.id}
              xs={columnsDef[gridSize]}
              sm={columnsDef[gridSize+1]}
              md={columnsDef[gridSize+2]}
            >
              <Link to={`/detail/${image.id}`} onClick={() => onLinkClick(image.id)}>
                <div className='photo-aspectfix'>
                  <div><LazyLoad><img className='list-img' src={image.url} width='100%' height='100%' alt={image.description} /></LazyLoad></div>
                </div>
              </Link>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default PhotoList;