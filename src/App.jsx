import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import "./App.css";
import { makeStyles } from "@material-ui/core";

function App() {

  const useStyles = makeStyles(() => ({
    app: {
      backgroundColor: '#111',
      color: '#eee',
      minHeight: '100vh'
    }
  }))

  const classes = useStyles();

  return (
    <div className={ classes.app }>
      <Router>
        <Header />
        <Main />
      </Router>
    </div>
  );
}

export default App;
