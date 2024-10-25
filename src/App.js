import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const ProductsListing = lazy(() => import('./pages/ProductsListing'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const fallbackUI = 
    <div className="container mx-auto animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-5 gap-16">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="w-[270px] border rounded-lg">
          <div className="w-full h-[200px] bg-gray-200"></div>
          <div className="ms-4 my-2 w-full py-2">
            <p className="h-3 bg-gray-200 rounded-full mt-2" style={{ width: '40%' }}></p>
            <p className="h-3 bg-gray-200 rounded-full my-2" style={{ width: '20%' }}></p>
          </div>
        </div>
      ))}
    </div>;

  return (
    <Router>
      <div className="px-4">
        <Suspense fallback={fallbackUI}>
          <Routes>
            <Route path="/" element={<ProductsListing />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
