import React from 'react'
import { AppBar, Container, Toolbar, Typography, Select, MenuItem } from '@material-ui/core'

const Header = () => {
  return (
    <AppBar position='static' color='transparent'>
      <Container>
        <Toolbar>
          <Typography>KryptoWatcher</Typography>

          <Select variant='outlined' style={{width: 100, height: 40, marginLeft: 15}}>
            <MenuItem>USD</MenuItem>
            <MenuItem>BRL</MenuItem>
            <MenuItem>EUR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header