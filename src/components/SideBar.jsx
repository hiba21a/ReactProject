import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FaTableCellsLarge } from "react-icons/fa6";
import Modal from "./Modal";

const SideBar = () => {
    const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
    const navigate =useNavigate()

    const handleOpenLogOutModal = () => {
        setIsLogOutModalOpen(true);
    };

    const handleCloseLogOutModal = () => {
        setIsLogOutModalOpen(false);
    };

    const handleConfirmLogOut = () => {        
        fetch("https://vica.website/api/logout",{
            method :"POST",
            headers :{
                "Accept" : "appliction/json",
                "AUTHORIZATION" : localStorage.getItem("token")
            }
        }).then(res =>res.json())
        .then(res =>{
            console.log(res)
            localStorage.removeItem("token")
            navigate("/")
        })
        .catch(err =>console.log(err))
        
        handleCloseLogOutModal();
            }
       
    return (
        <div className="h-screen fixed w-64 px-4 py-6 bg-white text-black">
        <div className="text-center mt-4">
            <h1 className="text-2xl font-extrabold">
            <span className="text-blue-600">Dash</span>Stack
            </h1>
        </div>
        <div className="h-full flex flex-col justify-between pt-16 pb-16">
            <div className="flex flex-col">
            <Link
                to="/home/dashboard"
                className="flex justify-center items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
            hover:bg-blue-600 hover:text-white"
            >
                <RiDashboard3Line className="w-5 h-5 mr-2 hover:text-white" />
                DachBord
            </Link>
            <Link
                to="/home/products"
                className="flex justify-center items-center mt-4 py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
            hover:bg-blue-600 hover:text-white"
            >
                <FaTableCellsLarge className="w-5 h-5 mr-2 hover:text-white" />
                Products
            </Link>
            </div>
            <div>
            <button
                onClick={handleOpenLogOutModal}
                className="flex justify-center items-center w-full py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
            hover:text-blue-600"
            >
                <AiOutlinePoweroff className="w-5 h-5 mr-2 hover:text-blue-600" />
                LogOut
            </button>
            </div>
        </div>

        {isLogOutModalOpen && (
            <Modal 
            onConfirm={handleConfirmLogOut}
            onCancel={handleCloseLogOutModal}
            message="Are you sure you want to Logout?"
            />
        )}
        </div>
    );

}
export default SideBar;

