import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import { MantineProvider } from '@mantine/core';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <MantineProvider>

    <App />
    </MantineProvider>

    
  
)
