import { useEffect, useState } from 'react';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IoIosArrowUp } from "react-icons/io";
import { Fab } from '@mui/material';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
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

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div>
      {visible && (
        <Fab
          color=''
          size='small'
          onClick={scrollToTop}
          style={{  
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            zIndex: 1000,
            color: 'white',
            backgroundColor: 'rgb(0, 0, 0, 0.3)'
          }}
        >
          <IoIosArrowUp style={{fontSize: "1.5rem"}} />
        </Fab>
      )}
    </div>
  );
};

export default ScrollToTopButton;
