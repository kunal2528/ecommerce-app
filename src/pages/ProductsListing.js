import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHistory } from 'react-icons/ai';
import { CgProfile } from "react-icons/cg";

const ProductsListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const searchInputRef = useRef(null);

  const productsPerPage = 10;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const navigate = useNavigate();

  const suggestions = ['phone', 'laptop', 'beauty', 'eyeshadow', 'shoes'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = debouncedQuery
          ? `https://dummyjson.com/products/search?q=${debouncedQuery}&limit=${productsPerPage}&skip=${(page - 1) * productsPerPage}`
          : `https://dummyjson.com/products?limit=${productsPerPage}&skip=${(page - 1) * productsPerPage}`;

        const response = await axios.get(url);
        setProducts(response.data.products);
        setTotalProducts(response.data.total);

        if (debouncedQuery) {
          addSearchToHistory(debouncedQuery);
        }
      } catch (err) {
        setError('Failed to fetch products');
      }
      setLoading(false);
    };

    fetchProducts();
    //eslint-disable-next-line
  }, [page, debouncedQuery]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setDebouncedQuery(searchQuery);
    setPage(1); 
    setShowSuggestions(false); 
  };

  const handleSuggestionClick = (term) => {
    setSearchQuery(term);
    setDebouncedQuery(term);
    setPage(1);
    setShowSuggestions(false);
  };

  const addSearchToHistory = (term) => {
    if (!searchHistory.includes(term)) {
      const updatedHistory = [term, ...searchHistory.slice(0, 2)]; 
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between bg-slate-200 rounded-lg p-5 sticky top-0 z-50'>
        <h1 className="lg:text-xl font-bold text-slate-700">ECOMMERCE</h1>
        <form
          onSubmit={handleSearchSubmit}
          className="relative lg:w-[400px] hidden lg:block"
          ref={searchInputRef}
        >
          <div className="flex rounded-md border-2 border-slate-700 overflow-hidden max-w-md mx-auto font-[sans-serif] h-10">
            <input type="email" value={searchQuery} onChange={handleSearchChange} onClick={() => setShowSuggestions(true)} placeholder="Search here..." className="w-full outline-none bg-white text-gray-600 text-md px-4 py-3" />
            <button type='button' className="flex items-center justify-center bg-slate-700 px-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white">
                <path
                  d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                </path>
              </svg>
            </button>
          </div>

          {showSuggestions && (
            <div className="absolute bg-white border w-full mt-2 rounded shadow-lg z-10">
              {searchHistory.length > 0 && (
                <div className="p-2 border-b">
                  <p className="text-gray-600 mb-2">Previous Searches:</p>
                  {searchHistory.map((term, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(term)}
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                    >
                      <AiOutlineHistory className="mr-2" /> {/* History icon */}
                      <span>{term}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-2">
                <p className="text-gray-600 mb-2">Suggestions:</p>
                {suggestions.map((term, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(term)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {term}
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
        <CgProfile size={32} />
      </div>

      {loading && (
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-5 gap-16">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="w-[270px] border rounded-lg">
              <div className="w-full h-[200px] bg-gray-200"></div>
              <div className="ms-4 my-2 w-full py-2">
                <p className="h-3 bg-gray-200 rounded-full mt-2" style={{ width: '40%' }}></p>
                <p className="h-3 bg-gray-200 rounded-full my-2" style={{ width: '20%' }}></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && products.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-xl">No products found</p>
        </div>
      )}

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 my-10 scroll-smooth">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onClick={handleProductClick} />
        ))}
      </div>

      {products.length > 0 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default ProductsListing;
