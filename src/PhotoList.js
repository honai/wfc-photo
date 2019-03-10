import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import './PhotoList.css';

const PhotoList = ({imagesList, onLinkClick, wrapWidth}) => {
  const [gridSize, setGridSize] = useState(2);
  const columnsDef = [6, 4, 3, 2, 1, 1, 1];
  const handleChangeGridSize = event => {
    setGridSize(Number(event.target.value));
  }
  return (
    <div>
      <FormLabel>グリッドサイズ</FormLabel>
      <RadioGroup
        name="gridSize"
        aria-label="gridSize"
        value={String(gridSize)}
        onChange={handleChangeGridSize}
        row
      >
        <FormControlLabel value='0' control={<Radio />} label="大" />
        <FormControlLabel value='1' control={<Radio />} label="中" />
        <FormControlLabel value='2' control={<Radio />} label="小" />
      </RadioGroup>
      <div className='photos-wrap'>
        <Grid container spacing={8}>
          {imagesList.map(image => (
            <Grid item className='item' key={image.id}
              xs={columnsDef[gridSize]}
              sm={columnsDef[gridSize+1]}
              md={columnsDef[gridSize+2]}
            >
              <Link to={`/detail/${image.id}`} onClick={() => onLinkClick(image.id)}>
                <img className='list-img' src={image.url} width='100%' height='100%' alt={image.description} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default PhotoList;