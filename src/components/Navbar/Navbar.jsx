import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({loginData,logout}) {
  console.log("navbar",loginData);
  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Noxe</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto ">
          {loginData?<>
            <li class="nav-item">
             <Link class="nav-link" to="home">Home</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="movies">Movies</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="tvshows">Tv Shows</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="people">People</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="about">About</Link>
            </li>
          </> :''}
        </ul>
        <ul class="navbar-nav ms-auto">
          {!loginData?<>
            <li class="nav-item">
             <Link class="nav-link" to="login">Login</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="register">Register</Link>
            </li>
          </>
          :
          <>
            <li class="nav-item">
               <Link class="nav-link" to="/">welcome {loginData.name}</Link>
            </li>
            <li class="nav-item">
               <Link class="nav-link" onClick={logout}>Logout</Link>
            </li>
          </>
          }
        </ul>
      </div>
    </div>
  </nav>  
  )
}
