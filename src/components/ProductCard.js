import React from 'react';

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      className="border rounded-lg shadow p-4 cursor-pointer hover:bg-gray-100 hover:scale-105 hover:shadow-xl overflow-hidden" 
      onClick={() => onClick(product.id)}
    >
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-56 object-contain mb-2 bg-slate-100 transform transition-transform duration-300 hover:scale-105"
          loading='lazy'
        />
      </div>
      <h2 className="font-medium ml-1">{product.title}</h2>
      <p className="text-gray-700 ml-1">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
