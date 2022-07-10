import React from "react";
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';

import { AppState } from "../../context/AppContext";

// styles
const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    fontFamily: "Montserrat-Light",
    cursor: "pointer",
  },
  featTitle: {
    color: "gold",
    fontWeight: 700,
  },
}));


// component
const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency } = AppState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#eee'
      },
      type: 'dark',
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography className={classes.title} onClick={() => navigate('/')} variant='h5'>
              <span className={classes.featTitle}>K</span>rypto
              <span className={classes.featTitle}>W</span>atcher
            </Typography>

            <Select
              value={currency}
              variant="outlined"
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(event) => setCurrency(event.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"BRL"}>BRL</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
