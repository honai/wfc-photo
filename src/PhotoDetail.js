import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

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
  const [isTextInfoOpen, setTextInfoOpen] = useState(false);

  const handleClick = () => {
    setTextInfoOpen(!isTextInfoOpen);
  }

  return (
    <div className='photo-detail'>
      <div className='button-wrap'>
        <Link to='/'>
          <div className='close-button'><i className="material-icons">arrow_back_ios</i></div>
        </Link>
      </div>
      <div className={`photo ${isTextInfoOpen ? 'open': ''}`}>
        <img src={image.url} alt={image.description} />
      </div>
      <div className='button-wrap'><Button className='close-button' onClick={handleClick}><i className="material-icons" style={{color: '#fff'}}>info</i></Button></div>
      <Slide direction="up" in={isTextInfoOpen} mountOnEnter unmountOnExit>
        <div className='info-card'>
          <Typography style={{fontSize: '1.2rem'}}>Title: {image.title}</Typography>
          <Typography style={{fontSize: '1.2rem'}}>Date: <Moment format='YYYY/MM/DD'>{image.date}</Moment></Typography>
          <Typography style={{fontSize: '1.2rem'}}>Author: {image.author}</Typography>
        </div>
      </Slide>
    </div>
  )
}

export default PhotoDetail;