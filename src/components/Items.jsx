import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Items = () => {
    const [items, setItems]= useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/items",{
          headers:{
            "Content-Type":"multipart/form-data",
            AUTHORIZATION:localStorage.getItem("token")
          }
        }).then(res =>setItems(res.data))
        .catch(err =>console.log(err))
    },[])
  return (
    <div>
        <Link  to ="/dashboard/item/create"> add item</Link>
      {items.map((item, index)=>{
        return (
          <div className='item' key={index}>
              <h1 >{item.name}</h1>
              <div className="btns">
                <Link to={`/dashboard/item/edit/${item.id}`}>edit</Link>
              </div>

          </div>
        )
      })}
    </div>
  )
}

export default Items
