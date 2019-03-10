import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './TitleBar.css';

const TitleBar = ({setGridSize}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleChange = size => {
    setAnchorEl(null);
    setGridSize(size);
  }
  return (
    <AppBar position="fixed" className='app-bar' color='primary'>
      <Toolbar className='tool-bar'>
        <Typography variant="h6" color="inherit">
          Photo
        </Typography>
        <Button onClick={handleClick}
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
        >
          <i className="material-icons" style={{color: '#fff', }}>more_vert</i>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleChange(0)}>グリッド(大)</MenuItem>
          <MenuItem onClick={() => handleChange(1)}>グリッド(中)</MenuItem>
          <MenuItem onClick={() => handleChange(2)}>グリッド(小)</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default TitleBar;