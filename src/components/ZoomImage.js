import React, { useState } from 'react';

const ZoomImage = ({ src, alt }) => {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  return (
    <div className="relative flex flex-col m-auto">
      <div
        className="relative overflow-hidden h-[300px] lg:h-[500px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '100%',
          backgroundImage: `url(${src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        aria-label={alt}
      >
        <img
          src={src}
          alt={alt}
          className="opacity-0"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <p className='m-auto my-10 text-gray-500 hidden lg:block'>Roll over image to zoom in</p>

      {showZoom && (
        <div
          className="fixed right-10 top-10 h-screen bg-white shadow-lg hidden lg:block"
          style={{
            width: '50vw',
            backgroundImage: `url(${src})`,
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            backgroundSize: '150%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: 50,
          }}
        ></div>
      )}
    </div>
  );
};

export default ZoomImage;
