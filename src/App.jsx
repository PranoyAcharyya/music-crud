
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import Library from './Pages/Libary'
import Player from './Pages/Player'
import Router from './router/Router'

function App() {
  

  return (
    <>
       <RouterProvider router={Router}/>
    </>
  )
}

export default App
