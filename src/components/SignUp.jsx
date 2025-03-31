import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [first_name,setFirstName] =useState("")
    const [last_name,setLastName] =useState("")
    const [email,setEmail] =useState("")
    const [password,setPassword]=useState("")
    const [password_confirmation,setPasswordConfirmation]=useState("")
    const [profile_image, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate =useNavigate()
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        setProfileImage(file); 
        setPreview(URL.createObjectURL(file));
        }
    };
    
    const sendData =(event)=>{
        event.preventDefault()
        const data =new FormData();
        data.append("first_name", first_name)
        data.append("last_name",last_name)
        data.append("user_name", `${first_name}_${last_name}`);
        data.append("email",email)
        data.append("password",password)
        data.append("password_confirmation",password_confirmation)
        data.append("profile_image",profile_image)

        fetch('https://vica.website/api/register',{
            method: "POST",
            headers :{
                Accept :"application/json",
            },
            body: data
        })
        .then(res =>res.json())
        .then(res=>{
            console.log(res)
            localStorage.setItem("token" ,"Bearer "+ res.data.token)
            localStorage.setItem("user", res.data.user.user_name);
            localStorage.setItem("profile_image_url", res.data.user.profile_image_url);
            navigate("/home")

        })
        .catch(err =>console.log(err))

  
    }

    return (

        <div className="bg-white rounded-lg shadow-lg p-8 w-[498px] h-[620px] top-10 left-[434px] rounded-[16px] flex flex-col">
        <div className="title-register">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
            <p className="text-gray-600 text-center mb-6">
            Create an account to continue
            </p>
        </div>
        <div className="data flex flex-col flex-grow">

            <form className="flex-grow">
            <div className="inputName flex justify-between">
                <div className="mb-4">
                <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="firstName"
                >
                    First Name
                </label>
                <input
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring"
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    required
                    onChange={(event)=>setFirstName(event.target.value)}
                />
                </div>
                <div className="mb-4">
                <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="lastName"
                >
                    Last Name
                </label>
                <input
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring"
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    required
                    onChange={(event)=>setLastName(event.target.value)}
                />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
                </label>
                <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring"
                type="email"
                id="email"
                placeholder="Email"
                required
                onChange={(event)=>setEmail(event.target.value)}
                />
            </div>
            <div className="inputPass flex justify-between">
                <div className="mb-4">
                <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring"
                    type="password"
                    id="password"
                    placeholder="********"
                    required
                    onChange={(event)=>setPassword(event.target.value)}
                />
                </div>
                <div className="mb-4">
                <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="confirmPassword"
                >
                    Confirm Password
                </label>
                <input
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring"
                    type="password"
                    id="confirmPassword"
                    placeholder="********"
                    required
                    onChange={(event)=>setPasswordConfirmation(event.target.value)}
                />
                </div>
            </div>
        
            <div className="mb-4 w-36 h-24">
                <label
                className="block text-sm font-medium mb-1"
                htmlFor="profileImage"
                >
                Profile Image
                </label>
                <label htmlFor="file-upload" className="bg-white border-2 border-dashed border-gray-300 w-full h-full flex flex-col items-center justify-center cursor-pointer space-y-2 p-4">
                {preview ? (
                    <img src={preview} alt="Uploaded" className="w-15 h-15" />
                ) : (
                    <>
                    <img src="/src/assets/images/Upload icon.svg" alt="Upload icon" className="w-10 h-10" />
                    </>
                )}
                <input id="file-upload" type="file" className="hidden" onChange={handleImageChange} />
                </label>

            </div>
            </form>
            <div className="foot-register">
            <button
                onClick={(event)=>sendData(event)}
                type="submit"
                className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
            >
                Sign Up
            </button>
            <div className="mt-4 text-center">
                <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/" className="text-blue-500 hover:underline">
                    {" "}
                    Sign In
                </Link>
                </p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default SignUp;
