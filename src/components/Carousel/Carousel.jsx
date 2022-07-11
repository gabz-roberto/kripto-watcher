import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { AppState } from "../../context/AppContext";
import { TrendingCoins } from "../../api/api";
import AliceCarousel from "react-alice-carousel";

const useStyles = makeStyles((theme) => ({
  carousel: {
    display: "flex",
    alignItems: "center",
    height: "50%",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textTransform: "uppercase",
    color: "#eee",
    cursor: "pointer",
  },
}));

export const addCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const { currency, symbol } = AppState();

  const classes = useStyles();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = trending.map((item) => {
    let variation = item.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coin/${item.id}`} className={classes.carouselItem}>
        <img
          src={item?.image}
          alt={item.name}
          height={"80"}
          style={{ marginBottom: 12 }}
        />
        <span>
          {item?.symbol} &nbsp;{" "}
          <strong style={{ color: variation > 0 ? '#00E02A' : '#F01608'}}>
            {variation && "+"} {item?.price_change_percentage_24h.toFixed(2)}%
          </strong>
        </span>
        <span style={{ fontSite: 20, fontWeight: 400 }}>
          {symbol} {addCommas(item?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        autoPlayInterval={1000}
        autoPlay
        mouseTracking
        infinite
        animationDuration={1600}
        disableButtonsControls
        disableDotsControls
        responsive={responsive}
        items={items}
      />
    </div>
  );
};

export default Carousel;
