import React,  { useState }  from "react";
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from "react-router-dom";

export default function Login({setUserData}) {
  let navigate = useNavigate();
  function goToHome(){
    let path = '/home'
    navigate(path)
  }
  let [user,setUser] = useState({
    email:'',
    password:'',
  });
  
  let [errorMsg,setErrorMsg] = useState('');
  let [loading,setLoading] = useState(false);
  //let [errorlist,setErrorlist] = useState([]);
  let submitFormData = async(e)=>{
    e.preventDefault();
    //let validateResult = validationForm();
    //setErrorlist(validateResult.error.details)
    let {data}=await axios.post("https://knowledge-saraha.herokuapp.com/users/signIn",user);
    if(data.message=='login'){
      localStorage.setItem('token',data.token);
      setUserData();
      goToHome();
    }else{
      setErrorMsg(data.message);
    }
  }

  let getFormValue = (e)=>{
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  function validationForm(){
    const schema = Joi.object({
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required(),
    });
    
    return schema.validate(user,{abortEarly:false});
  }
  return (
    <>
      {errorMsg?<div className='alert alert-danger mt-5'>
       {errorMsg}
       </div>:''}
      <form onSubmit={submitFormData}>
        <div className="form-group my-3">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={getFormValue} name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" onChange={getFormValue} name="password" className="form-control" id="password" placeholder="Enter password"/>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          {loading?<i className="fa-solid fa-spinner fa-spin"></i>:'Login'}
        </button>
      </form>
    </>
  );
}
