import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import TickerList from './TickerList'
test('renders TickerList', ()=>{
  render(<Provider store={store}><TickerList/></Provider>)
  expect(screen.getByText(/Tickers/i)).toBeInTheDocument()
})
