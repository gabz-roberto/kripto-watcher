import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../../api/api";
import { AppState } from "../../context/AppContext";
import { Container, createTheme, TextField, ThemeProvider, Typography } from "@material-ui/core";

const Table = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('')

  const { currency } = AppState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#eee",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: 'center'}}>
            <Typography variant="h4" style={{margin: 20, fontFamily: 'Montserrat-regular'}}>
                Cotação de Criptomoedas - by Market Cap
            </Typography>
            <TextField label="Buscar" variant="outlined" style={{ width: '100%', margin: '20px 0'}} value={search} onChange={e => setSearch(e.target.value)}/>
        </Container>
    </ThemeProvider>
  );
};

export default Table;
