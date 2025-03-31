import React from "react";
import { Link } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

const ProductInfo = ({ product, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(product.id);
  };

  return (
    <>
      <tr key={product.id} className="text-center hover:bg-gray-50 h-24">
        <td className="py-3 px-4 border-b">{product.id}</td>
        <td className="py-3 px-4 border-b">{product.name}</td>
        <td className="py-3 px-4 border-b">{product.price}</td>
        <td className="py-3 px-4 border-b">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-20 h-full object-cover mx-auto"
          />
        </td>
        <td className="py-3 px-4 border-b">
          <div className="flex justify-center border border-gray-300 rounded-lg w-fit mx-auto">
            <Link
              to={`/home/products/edit/${product.id}`}
              className="p-2 border-r border-gray-300"
            >
              <FaRegEdit className="text-gray-700 text-xl" />
            </Link>
            <button onClick={handleDeleteClick} className="p-2">
              <FaTrashAlt className="text-red-600 text-xl" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductInfo;
