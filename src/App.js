import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { AppRoute } from './routers/AppRoute'
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider } from '@material-ui/core/styles'


export const App = () => {

  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  )
}

