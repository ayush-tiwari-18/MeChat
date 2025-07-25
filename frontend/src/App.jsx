import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import {Toaster} from "react-hot-toast";
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth}= useAuthStore();
  const {currTheme}= useThemeStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log(authUser);

  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <span className="loading loading-dots loading-lg"></span>
    </div>
  )

  return (
    <div data-theme={currTheme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login" />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;
