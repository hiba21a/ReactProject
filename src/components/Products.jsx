import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import axios from "axios";
import Modal from "./Modal";

const Products = () => {
  const [items, setItems] = useState([]);
  const [updatItems, setUpdatItems] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); 

  const openDeleteModal = (id) => {
    setSelectedProductId(id); 
    setDeleteModalOpen(true); 
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false); 
  };

  useEffect(() => {
    axios
      .get("https://vica.website/api/items", {
        headers: {
          "Content-Type": "multipart/form-data",
          AUTHORIZATION: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => console.log(err));
  }, [updatItems]);

  const deleteItem = (id) => {
    axios
      .delete(`https://vica.website/api/items/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setUpdatItems(!updatItems);
        setDeleteModalOpen(false); 
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Manage Products</h1>
        <Link
          to="/home/products/add"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          + Add Product
        </Link>
      </div>
      <div className="mt-10">
        <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="">
            <tr>
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Product Name</th>
              <th className="py-3 px-4 border-b">Price</th>
              <th className="py-3 px-4 border-b">Image</th>
              <th className="py-3 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <ProductInfo
                key={item.id}
                product={item}
                onDelete={openDeleteModal} 
              />
            ))}
          </tbody>
        </table>
      </div>

      {deleteModalOpen && (
        <Modal
          onConfirm={() => deleteItem(selectedProductId)} 
          onCancel={closeDeleteModal} 
          message="Are you sure you want to Delete?"
        />
      )}
      <Outlet />
    </div>
  );
};

export default Products;
