import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "../Carousel/Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(../images/banner.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "none",
  },
  content: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 25,
  },
  featTitle: {
    color: "gold",
  },
  tagRow: {
    display: 'flex',
    flexDirection: 'column',
    height: '40%',
    justifyContent: 'center',
    textAlign: 'center',
  }
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <section className={classes.banner}>
      <Container className={classes.content}>
        <div className={classes.tagRow}>
          <Typography
            variant="h1"
            style={{
              fontWeight: "10",
              marginBottom: 15,
              fontFamily: "Montserrat-regular",
            }}
          >
            <span className={classes.featTitle}>K</span>rypto
            <span className={classes.featTitle}>W</span>atcher
          </Typography>
          <Typography variant="subtitle1" style={{ color: '#ddd', textTransform: 'capitalize', fontFamily: "Montserrat-bold" }}>
            Fique por dentro do mercado de cripto através do KryptoWatcher.
          </Typography>
        </div>

        <Carousel />
      </Container>
    </section>
  );
};

export default Banner;
