import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Details() {
  let prefix = "https://image.tmdb.org/t/p/w500/";
  let [searchParams, setSearchParams] = useSearchParams();
  let [details, setDetails] = useState([]);
  let currentId = searchParams.get("id");
  async function getDetails() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${currentId}?api_key=d179b30015a65de52e0cb2b7dcd5bc52&language=en-US`
    );
    setDetails(data);
  }
  useEffect(() => {
    getDetails();
  });
  return (
    <div className='row'>
        <div className='col-md-4 my-3'>
            <div className='text-center'>
               <img src={prefix+details.poster_path} className='w-75'/>
               <h2 className='mt-3'>{details.title}</h2>
            </div>
        </div>
        <div className='col-md-4 my-3'>
            <div className='text-center '>
               <p>{details.overview}</p>
            </div>
        </div>
    </div>
  );
}
