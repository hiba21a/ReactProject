import axios from "axios";
import React, { useState } from "react";  
import { useNavigate} from "react-router-dom";  

const CreateItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

      
  const handleImageChange = (event) => {
          const file = event.target.files[0];
          if (file) {
          setImage(file); 
          setPreview(URL.createObjectURL(file));
          }
      };
      
      const sendData =event =>{
        event.preventDefault()
        axios.post("https://vica.website/api/items",{
            name,price,image
        },{
            headers :{
                "Content-Type":"multipart/form-data",
                Authorization :localStorage.getItem("token")
            }
        }).then(res =>{
            console.log(res.data)
            navigate("/home/products")
        })
        .catch(err =>console.log(err))
    }
  return (
    <div className="p-8">
      <div className="">
        <h1 className="text-2xl">Add Product</h1>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-10">
        <div>
          <form onSubmit={sendData}>
          
            <div className="mb-6">
              <label className="block text-gray-700" htmlFor="product-name">
                Product Name
              </label>
              <input
                id="product-name"
                placeholder="Product Name"
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                type="text"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700" htmlFor="price">
                Price
              </label>
              <input
                id="price"
                placeholder="Price"
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                type="text"
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <button className="bg-blue-500 text-white py-2 px-10 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center">
          <label
            htmlFor="file-upload"
            className="bg-white border-dashed border-2 border-gray-300 w-full h-full flex flex-col items-center justify-center cursor-pointer space-y-2"
          >
          {preview ? (
                    <img src={preview} alt="Uploaded" className="w-15 h-15 object-cover" />
                ) : (
                    <>
                    <img src="/src/assets/images/Upload icon.svg" alt="Upload icon" className="w-15 h-15" />
                    </>
                )}
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />            
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
