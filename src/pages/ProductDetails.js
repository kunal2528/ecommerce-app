import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar, FaAngleRight } from 'react-icons/fa';
import ReturnPolicy from '../images/icon-returns._CB562506492_.png';
import WarrantyPolicy from '../images/icon-warranty._CB485935626_.png';
import TrustEvent from '../images/trust_icon_free_shipping_81px._CB562549966_.png';
import ZoomImage from '../components/ZoomImage';
import { CgProfile } from "react-icons/cg";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details');
      }
      setLoading(false);
    };

    fetchProductDetails();
  }, [productId]);

  const handleBackClick = () => {
    navigate(-1); 
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars).fill(<FaStar className="text-orange-500" />)}
        {hasHalfStar && <FaStarHalfAlt className="text-orange-500" />}
        {Array(emptyStars).fill(<FaRegStar className="text-gray-300" />)}
      </>
    );
  };

  if (loading) return (
    <div className="animate-pulse flex flex-wrap items-center justify-evenly my-20 w-full p-10">
      <div className="w-1/2 bg-gray-200 pr-5">
        <p className="h-[400px] bg-gray-200 rounded-full mt-2"></p>
      </div>
      <div className="w-1/2 pl-5">
        <p className="h-3 bg-gray-200 rounded-full mt-2" style={{ width: '40%' }}></p>
        <p className="h-3 bg-gray-200 rounded-full my-2" style={{ width: '20%' }}></p>
        <p className="h-3 bg-gray-200 rounded-full my-2" style={{ width: '20%' }}></p>
        <p className="h-3 bg-gray-200 rounded-full my-2" style={{ width: '60%' }}></p>
        <p className="h-3 bg-gray-200 rounded-full my-2" style={{ width: '30%' }}></p>
        <div className='flex items-start my-3 py-3 border-y'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="w-20 m-1">
              <p className="h-14 bg-gray-200 rounded-full"></p>
            </div>
          ))}
        </div>
        <p className="h-3 bg-gray-200 rounded-full my-2" style={{ width: '20%' }}></p>
        <p className="h-3 bg-gray-200 rounded-full my-2" style={{ width: '10%' }}></p>
        <p className="h-3 bg-gray-200 rounded-full my-2" style={{ width: '5%' }}></p>
        <p className="h-3 bg-gray-200 rounded-full my-2" style={{ width: '30%' }}></p>
      </div>
    </div>);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!product) return <p className='text-center'>No product details found</p>;

  return (
    <div className='p-5'>
      <div className="flex items-center mb-4">
        <button
          onClick={handleBackClick}
          className="flex items-center hover:text-blue-700"
        >
          products 
        </button>
        &nbsp;
        <FaAngleRight size={18} /> 
        &nbsp;
        {product.title}
      </div>
      <div className='lg:flex items-center justify-evenly my-10 w-full bg-slate-50 p-10'>
        <div className='lg:w-1/2 pr-4 flex flex-col lg:flex-row items-center'>
          <div className='lg:flex hidden flex-col'>
            {product.images.length > 1 && product.images.map((item, index) => (
              <img key={item} src={item} alt={item} className='w-20 h-20 cursor-pointer' onClick={() => setImageIndex(index)} />
            ))}
          </div>
          <ZoomImage src={product.images[imageIndex]} alt={product.title} />
          <div className='flex lg:hidden flex-row mb-5'>
            {product.images.length > 1 && product.images.map((item, index) => (
              <img key={item} src={item} alt={item} className='w-20 h-20 cursor-pointer' onClick={() => setImageIndex(index)} />
            ))}
          </div>
        </div>
        <div className='lg:w-1/2 pl-4'>
          <div className='flex flex-col'>
            <p className="text-2xl font-semibold ">{product.title}</p>
            <p className="text-sm text-[#007185]">Brand: {product.brand}</p>
            <p className="text-sm text-[#007185]">Category: {product.category}</p>
            <div className="flex items-center">
              <span className="mr-2">{product.rating.toFixed(1)}</span>
              <div className="flex">
                {renderStars(product.rating)}
              </div>
            </div>
            <div className='flex items-center mt-2 border-t'>
              <p className="font-semibold text-xl my-4">${product.price.toFixed(2)}</p>
              {product.discountPercentage && (
                <p className="text-red-500 text-sm mx-1">(-{product.discountPercentage}%)</p>
              )}
            </div>
            <p className='font-medium py-1'>About this item</p>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className='font-medium py-1'>Product Dimensions</p>
            <p className="text-sm text-gray-500">
              {product.dimensions.depth}D x {product.dimensions.width}W x {product.dimensions.height}H Centimeters
            </p>
            <div className='flex items-start my-3 py-3 px-1 text-[#007185] text-center text-xs border-y'>
              {product.returnPolicy && <div className='w-20 flex flex-col items-center m-1'>
                <img src={ReturnPolicy} alt={product.sku} className='h-12' />
                <p>{product.returnPolicy}</p>
              </div>}
              {product.warrantyInformation && <div className='w-20 flex flex-col items-center m-1'>
                <img src={WarrantyPolicy} alt={product.sku} className='h-12' />
                <p>{product.warrantyInformation}</p>
              </div>}
              {product.shippingInformation && <div className='w-20 flex flex-col items-center m-1'>
                <img src={TrustEvent} alt={product.sku} className='h-12' />
                <p>{product.shippingInformation}</p>
              </div>}
              {product.stock && <div className='w-20 flex flex-col items-center m-1'>
                <div className='rounded-full w-12 h-12 bg-gray-100 text-2xl flex items-center justify-center'>{product.stock}</div>
                <p>only left in stock</p>
              </div>}
            </div>
            <div>
              <p className='font-medium'>Top reviews</p>
              <div className='my-2 px-1'>
                {product.reviews.map(item => (
                  <div className='my-2' key={item}>
                    <div className='flex items-center'>
                      <CgProfile className='text-gray-500' />
                      <p className='ml-1 text-gray-500'>{item.reviewerName}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm">{item.rating.toFixed(1)}</span>
                      <div className="flex">
                        {renderStars(item.rating)}
                      </div>
                    </div>
                    <p className='text-sm'>{item.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
