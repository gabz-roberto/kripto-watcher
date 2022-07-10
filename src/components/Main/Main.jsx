import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../../views/Home/Home';
import NotFound from '../../views/NotFound/NotFound';
import CoinPage from '../../views/CoinPage/CoinPage';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path='/coin/:id' element={<CoinPage />}/>
        <Route path='*' element={<NotFound />}/>
        <Route exact path="/" element={<Home />}/>
      </Routes>
    </main>
  )
}

export default Main