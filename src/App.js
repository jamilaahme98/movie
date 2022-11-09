import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Movies from './components/Movies/Movies';
import TvShows from './components/TvShows/TvShows';
import People from './components/People/People';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import './App.css';
import { Route, Router, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Details from './components/Details/Details';
function App() {
  let [loginData,setLoginData] = useState(null);
  function setUserData(){
    let token = localStorage.getItem('token');
    let decoded = jwtDecode(token);
    setLoginData(decoded);
    console.log(loginData);
  }
  function logout(){
    localStorage.removeItem('token');
    setLoginData(null);
    Navigate('/login');
  }
  useEffect (()=>{
    if(localStorage.getItem('token')){
      setUserData();
    }
  } ,[])
  return (
    <div className="">
      <Navbar loginData={loginData} logout={logout}/>
      <div className='container'>
        <Routes>
          <Route element={<ProtectedRoutes loginData={loginData}/>}>
           <Route path="/" element={<Home />}></Route>
           <Route path="home" element={<Home />}></Route>
           <Route path="movies" element={ <Movies />}></Route>
           <Route path="details" element={ <Details />}></Route>
           <Route path="tvShows" element={<TvShows />}></Route>
           <Route path="people" element={<People />}></Route>
           <Route path="about" element={<About />}></Route>
          </Route>
          <Route path="login" element={<Login setUserData={setUserData} />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
