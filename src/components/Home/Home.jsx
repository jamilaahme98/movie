import React from 'react'
import axios from 'axios';
import styles from'./Home.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  let navigate = useNavigate();
  function goToDetails(id){
    navigate({
      pathname:'/details',
      search:`?id=${id}`,
    })
  }
  let [trendingMovies,setTrendingMovies] = useState([]);
  let [trendingTv,setTrendingTv] = useState([]);
  let [trendingPerson,setTrendingPerson] = useState([]);

  let prefix = "https://image.tmdb.org/t/p/w500/";
  async function getTrendingItems(mediaType,callback){
     let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=d179b30015a65de52e0cb2b7dcd5bc52`);
     callback(data.results);
  }
  useEffect(()=>{
    getTrendingItems("movie",setTrendingMovies);
    getTrendingItems("tv",setTrendingTv);
    getTrendingItems("person",setTrendingPerson);
  },[])
  
  return (
    <>
      <div className='row'>
        <div className='col-md-4 d-flex align-items-center'>
          <div>
           <div className={`w-50 mb-3 ${styles.brdr}`}></div>
           <h2>Trending Movies</h2>
           <p>this is trending movies</p>
           <div className={`w-100 mb-3 ${styles.brdr}`}></div>
          </div>
        </div>
        {trendingMovies.map( (movie,index)=>
          <div onClick={()=>goToDetails(movie.id)} className='col-md-4 my-3' key={index}>
            <div className='text-center'>
            <img src={prefix+movie.poster_path} className='w-75'/>
             <h2 className='mt-3'>{movie.title}</h2>
            </div>
          </div>
        )}
      </div>

      <div className='row'>
        <div className='col-md-4 d-flex align-items-center'>
          <div>
           <div className={`w-50 mb-3 ${styles.brdr}`}></div>
           <h2>Trending Tv</h2>
           <p>this is trending Tv</p>
           <div className={`w-100 mb-3 ${styles.brdr}`}></div>
          </div>
        </div>
        {trendingTv.map( (movie,index)=>
          <div className='col-md-4 my-3' key={index}>
            <div className='text-center'>
            <img src={prefix+movie.poster_path} className='w-75'/>
             <h2 className='mt-3'>{movie.name}</h2>
            </div>
          </div>
        )}
      </div>

      <div className='row'>
        <div className='col-md-4 d-flex align-items-center'>
          <div>
           <div className={`w-50 mb-3 ${styles.brdr}`}></div>
           <h2>Trending Person</h2>
           <p>this is trending Person</p>
           <div className={`w-100 mb-3 ${styles.brdr}`}></div>
          </div>
        </div>
        {trendingPerson.map( (movie,index)=>
          <div className='col-md-4 my-3' key={index}>
            <div className='text-center'>
            <img src={prefix + movie.profile_path} className='w-75'/>
             <h2 className='mt-3'>{movie.name}</h2>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
