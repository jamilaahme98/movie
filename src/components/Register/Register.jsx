import React,  { useState }  from "react";
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  function goToLogin(){
    let path = '/login'
    navigate(path)
  }
  let [user,setUser] = useState({
    name:'',
    age:'',
    email:'',
    password:'',
  });
  let [loading,setLoading] = useState(false);

  //let [errorlist,setErrorlist] = useState([]);
  
  let submitFormData = async(e)=>{
    e.preventDefault();

    //let validateResult = validationForm();
    //setErrorlist(validateResult.error.details)
    let {data}=await axios.post("https://knowledge-saraha.herokuapp.com/users/signUp",user);
    if(data.message=='success'){
      goToLogin();  
    }
    setLoading(true);
  }

  let getFormValue = (e)=>{
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
 
  function validationForm(){
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(20).required(),
      age: Joi.number().required().min(20).max(70),
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required(),
    });
    
    return schema.validate(user,{abortEarly:false});
  }
  return (
    <>
    {/*errorlist.map((error,index)=>
     <div className='alert alert-danger'>{error.message}</div>
    )}*/}
      <form onSubmit={submitFormData}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input type="text" onChange={getFormValue} name="name" className="form-control" id="name" aria-describedby="emailHelp"placeholder="Enter name"/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="age">Age</label>
          <input type="number" onChange={getFormValue} name="age" className="form-control" id="last_name" aria-describedby="emailHelp"placeholder="Enter Age"/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={getFormValue} name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" onChange={getFormValue} name="password" className="form-control" id="password" placeholder="Enter password"/>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          {loading?<i className="fa-solid fa-spinner fa-spin"></i>:'Register'}
        </button>
      </form>
    </>
  );
}
