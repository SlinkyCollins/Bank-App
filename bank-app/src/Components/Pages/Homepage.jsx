import { Container, Typography, Button, AppBar, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './Homepage.css';
import Logo from "../Pages/logo.png";
import FullPageLoader from '../FullPageLoader';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import image3 from '/src/assets/banking3.jpg';
import image8 from '/src/assets/banking8.jpg';
// import image6 from '/src/assets/banking6.jpg';
// import image11 from '/src/assets/banking11.jpg';
// import image12 from '/src/assets/banking12.jpg';
// import image16 from '/src/assets/banking16.jpg';
// import image20 from '/src/assets/banking20.jpg';


import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const Homepage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{display: "flex", flexDirection: "row",}}>
          <div style={{ marginRight: "2rem", flex: "1" }}>
            <Link to="/">
              <img src={Logo} style={{ width: "7rem", cursor: "pointer" }} alt="NairaNest Logo"/>
            </Link>
          </div>
          
           <div style={{}}>
            <MenuIcon
                fontSize='large'
                style={{
                  margin: "10px"
                }}
              />
           </div>
          {/* <Link to="/login"><Button variant="outlined" style={{color: "#fff"}}>Login</Button></Link>
          <Link to="/signup"><Button variant="contained" color="primary">Sign Up</Button></Link> */}
          {/* <Link to="/send"><Typography variant="h6">SEND</Typography></Link>
          <Link to="/receive"><Typography variant="h6">RECEIVE</Typography></Link>
          <Link to="/about"><Typography variant="h6">ABOUT US</Typography></Link>
          <Link to="/services"><Typography variant="h6">SERVICES</Typography></Link>
          <Link to="/help"><Typography variant="h6">HELP</Typography></Link>
          <Link to="/contact"><Typography variant="h6">CONTACT</Typography></Link> */}
        </Toolbar>
      </AppBar>

      {/* <Container className="homepage-container">
        <Box textAlign="center">
          <Typography variant="h2">Welcome to NairaNest</Typography>
          <Typography variant="h5">Your trusted partner in managing and growing your finances.</Typography>
          <Button variant="contained" color="primary">Get Started</Button>
          <Button variant="outlined" color="secondary">Learn More</Button>
        </Box>
      </Container> */}

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="myFirstSwiper"
      >
        <SwiperSlide>
                <div className="slide-container">
                    <img src={image3} alt="Slide 1" />
                    <div className="overlay"></div> 
                    <div className="caption">
                        <h2>Send & Receive Money</h2>
                        <p>Quickly and easily send, receive and request money online with NairaNest. Over 180 countries and 120 currencies supported.</p>
                        <div className="slide-btn-container">
                          <div className='slide-btn1-wrapper'>
                            <button className='slide-btn1'>Open a free account</button>
                          </div>
                          <div className='slide-btn2-wrapper' style={{position: "relative"}}>
                            <PlayArrowIcon style={{position: "absolute", top: "0", margin: "12px 0 0 7px"}}/>
                            <button className='slide-btn2'> See how it works</button>
                          </div>
                        </div>
                    </div>
                </div>
        </SwiperSlide>
        {/* <SwiperSlide><img src={image2} alt="Slide 2" /></SwiperSlide> */}
        <SwiperSlide>
                <div className="slide-container">
                    <img src={image8} alt="Slide 3" />
                    <div className="overlay"></div>
                    <div className="caption">
                        <h2>Trusted by more than 50,000 businesses worldwide.</h2>
                        <p>Over 180 countries and 120 currencies supported.</p>
                        <div className="slide-btn-container">
                          <div className='slide-btn1-wrapper'>
                            <button className='slide-btn1'>Get started for free</button>
                          </div>
                          <div className='slide-btn3-wrapper' style={{position: "relative"}}>
                            <PlayCircleIcon style={{position: "absolute", top: "0", margin: "12px 0 0 20px"}}/>
                            <button className='slide-btn3'>Learn More</button>
                          </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

      </Swiper>
    </>
  );
};

export default Homepage;
