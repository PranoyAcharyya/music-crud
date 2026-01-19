
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import Router from './router/Router'

function App() {
  

  return (
    <>
       <RouterProvider router={Router}/>
    </>
  )
}

export default App
