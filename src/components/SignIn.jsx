import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email,setEmail]= useState("")
  const [password,setPassword] =useState("")
  const navigate = useNavigate()
  useEffect (()=>{
      if(localStorage.getItem("token")){
          navigate('/home')
            }
      },[])

  const sendData=(event)=>{
    event.preventDefault()
    axios.post("https://vica.website/api/login",{
    email,
    password
    },{
      headers :{
        "Accept":"application/json",  
      }
    }
    ).then(res =>{
      console.log(res.data)
      console.log(res.data.user)
      localStorage.setItem("token" ,"Bearer "+ res.data.token)
      localStorage.setItem("user", res.data.user.user_name);
      localStorage.setItem("profile_image_url", res.data.user.profile_image_url);
      navigate("/home")
    }).catch(err=>console.log(err))
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-[498px] h-[620px] top-10 left-[434px] rounded-[16px] flex flex-col">
      <div className="title-register">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <p className="text-gray-600 text-center mb-6">
          Please enter your email and password to continue
        </p>
      </div>
      <div className="data flex flex-col flex-grow">

        <form className="flex-grow" onSubmit={(event)=>sendData(event)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Email"
              required
              onChange={(event)=>setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Password"
              required
              onChange={(event)=>setPassword(event.target.value)}
            />
          </div>
        </form>
        <div className="foot-register">
          <button
            onClick={(event)=>sendData(event)}
            type="submit"
            className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            Sign In
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?
              <Link to="/signup" className="text-blue-500 hover:underline">
                {" "}
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;


