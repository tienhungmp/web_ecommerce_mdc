import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundUp } from 'react-icons/io';
import { useLocation } from 'react-router-dom';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    visible && ( // Chỉ hiển thị nút khi visible là true
      <button
        onClick={scrollToTop}
        className="fixed bottom-[80px] right-[20px] border-none rounded-full cursor-pointer z-50 
        transition-transform transform duration-200 ease-in-out 
        hover:scale-110 hover:shadow-lg active:scale-95"
      >
        <div className='w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center bg-white border border-primary rounded-full shadow'>
          <IoIosArrowRoundUp className='text-primary' size={25} />
        </div>
      </button>
    )
  );
};

export default ScrollToTopButton;