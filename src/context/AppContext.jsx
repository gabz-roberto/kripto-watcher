import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const Context = createContext()

const AppContext = ({ children }) => {
    const [currency, setCurrency] = useState('BRL');
    const [symbol, setSymbol] = useState('R$');

    useEffect(()=> {
        if(currency === "BRL") setSymbol('R$');
        else if (currency === 'USD') setSymbol('$');
        else if (currency === "EUR") setSymbol('€');
    }, [currency]);

  return (
    <Context.Provider value={{ currency, setCurrency, symbol }}>
        { children }
    </Context.Provider>
  )
}

export default AppContext;

export const AppState = () => {
    return useContext(Context);
}