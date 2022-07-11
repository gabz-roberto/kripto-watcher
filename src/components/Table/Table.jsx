import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../../api/api";
import { AppState } from "../../context/AppContext";
import {
  Container,
  createTheme,
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TextField,
  ThemeProvider,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { addCommas } from "../Carousel/Carousel";

const TableCoins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { currency, symbol } = AppState();

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#333",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#222",
      },
      fontFamily: "Montserrat-regular",
    },
  }));

  const classes = useStyles();

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

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 20, fontFamily: "Montserrat-regular" }}
        >
          Cotação de Criptomoedas - by Market Cap
        </Typography>
        <TextField
          label="Buscar"
          variant="outlined"
          style={{ width: "100%", margin: "20px 0" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#eee" }} />
          ) : (
            <Table style={{ borderRadius: "10px", overflow: "hidden" }}>
              <TableHead style={{ backgroundColor: "#ccc" }}>
                <TableRow>
                  {["Moeda", "Preço", "Variação 24h", "Market Cap"].map(
                    (item) => (
                      <TableCell
                        style={{
                          color: "#222",
                          fontWeight: "700",
                          fontFamily: "Montserrat-bold",
                        }}
                        key={item}
                        align={item === "Moeda" ? "inherit" : "right"}
                      >
                        {item}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((row) => {
                  let variation = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow
                      key={row.name}
                      onClick={() => navigate(`/coin/${row.id}`)}
                      className={classes.row}
                    >
                      <TableCell
                        component={"th"}
                        scope="row"
                        style={{ display: "flex", gap: 15 }}
                      >
                        <img
                          src={row?.image}
                          alt={row?.name}
                          height="40"
                          style={{ margin: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{ textTransform: "uppercase", fontSize: 22 }}
                          >
                            {row?.symbol}
                          </span>
                          <span style={{ color: "#ddd" }}>{row?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol} {addCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontWeight: 700,
                          color: variation > 0 ? "#00E02A" : "#F01608",
                        }}
                      >
                        {variation && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {addCommas(row.market_cap.toString().slice(0, -6))}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default TableCoins;
