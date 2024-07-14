import React, { useContext, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from './pages/Home'
import Header from './components/Header'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { server, Context } from './main'

const App = () => {

  const {setUser, setIsAuthenticated, setLoading} = useContext(Context)

  useEffect(()=>{
    setLoading(true)
    axios.get(`${server}/users/me`,{
      withCredentials: true,
    }).then(res=>{
      setUser(res.data.user)
      setIsAuthenticated(true)
      setLoading(false)
    }).catch(()=>{
      setUser({})
      setIsAuthenticated(false)
      setLoading(false)
    })
  },[])

  return (
    <Router>
      <ToastContainer/>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
