import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import SideBar from './Components/SideBar/SideBar'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';

const App = () => {

  // const url = "http://localhost:4000"
  const url = "https://foodstack-sw8i.onrender.com";


  return (
    <div>
      <ToastContainer />
      <NavBar/>
      <hr />
      <div className="app-content">
        <SideBar/>
        <Routes>
          <Route path='add' element={<Add url={url}/> }  />
          <Route path='list' element={<List url={url}/> } />
          <Route path='orders' element={<Orders url={url}/> } />
        </Routes>

      </div>
    </div>
  )
}

export default App
