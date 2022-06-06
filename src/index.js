import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClientContext, GraphQLClient } from 'graphql-hooks'
import { BrowserRouter } from 'react-router-dom'

// components
import App from './App'

// styles
import 'antd/dist/antd.css';
import './index.scss'

// utils
import reportWebVitals from './reportWebVitals'
import { message } from 'antd'

const client = new GraphQLClient({
  url: 'https://graphql.anilist.co',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  onError: () => {
    message.error('Something wrong with server, please try again later!')
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientContext.Provider value={client}>
        <App />
      </ClientContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
