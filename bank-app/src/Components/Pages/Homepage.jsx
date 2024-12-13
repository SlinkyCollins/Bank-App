import {AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import './Homepage.css';
import Logo from "../Pages/logo.png";
import FullPageLoader from '../FullPageLoader';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import image3 from '/src/assets/banking3.jpg';
import image8 from '/src/assets/banking8.jpg';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HamburgerMenu from '../HamburgerMenu';
import { FaHandPointer } from "react-icons/fa";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LockIcon from '@mui/icons-material/Lock';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import freelancer from "/src/assets/freelancer.jpg";
import shopping from "/src/assets/onlineShopping.jpg";
import seller from "/src/assets/onlineSellers.jpg";
import affiliateMarketing from "/src/assets/affiliateMarketing.jpg";
import { FaShareSquare } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import appStore from "/src/assets/app-store.png";
import googlePlay from "/src/assets/google-play-store.png";
import { FaFacebookF } from "react-icons/fa";
import { Google, Twitter } from '@mui/icons-material';
import { YouTube } from '@mui/icons-material';
import ScrollToTopButton from '../ScrollToTopButton';
import VideoSection from './VideoSection';
import { ImCheckmark } from "react-icons/im";


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
      <Toolbar style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "2rem", flex: "1" }}>
            <Link to="/">
              <img src={Logo} style={{ width: "7rem", cursor: "pointer" }} alt="NairaNest Logo"/>
            </Link>
          </div>
          
          <div>     
            <HamburgerMenu/>
          </div>
        </Toolbar>
      </AppBar>

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
                      <LazyLoadImage 
                        effect="blur"
                        width="100%"
                        height="100%"
                        src={image3} 
                        alt="Slide 1" 
                        style=
                        {{ 
                            objectFit: "cover"
                        }}
                      />
                    <div className="overlay"></div> 
                    <div className="caption">
                        <h2>Send & Receive Money</h2>
                        <p>Quickly and easily send, receive and request money online with NairaNest. Over 180 countries and 120 currencies supported.</p>
                        <div className="slide-btn-container">
                          <div className='slide-btn1-wrapper'>
                            <Link to="/signup"><button className='slide-btn1'>Open a free account</button></Link>
                          </div>
                          <div className='slide-btn2-wrapper' style={{position: "relative"}}>
                            <PlayArrowIcon style={{position: "absolute", top: "0", margin: "12px 0 0 7px"}}/>
                            <button className='slide-btn2'> See how it works</button>
                          </div>
                        </div>
                    </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
                <div className="slide-container">
                    <LazyLoadImage 
                        effect="blur"
                        width="100%"
                        height="100%"
                        src={image8}
                        alt="Slide 3" 
                        style=
                        {{ 
                            objectFit: "cover"
                        }}
                      />
                    <div className="overlay"></div>
                    <div className="caption"> 
                        <h2>Trusted by more than 50,000 businesses worldwide.</h2>
                        <p>Over 180 countries and 120 currencies supported.</p>
                        <div className="slide-btn-container">
                          <div className='slide-btn1-wrapper'>
                          <Link to="/signup"><button className='slide-btn1'>Get started for free</button></Link>
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

      <section>
        <div style={{padding: "3.5rem .5rem 3.5rem .5rem"}}>
          <h1 style={{fontSize: "2rem", textAlign: "center", marginBottom: ".7rem", fontWeight: "500"}}>Why should you choose NairaNest?</h1>
          <p style={{lineHeight: "30px", fontSize: "1.2rem", textAlign: "center", fontWeight: "300", letterSpacing: ".2px", color: "#646765"}}>Here&#39;s Top 4 reasons why you need a NairaNest account to manage your money.</p>
        </div>
        
        <div style={{padding: "0 1rem 0 1rem", display: "flex", flexDirection: "column", gap: "3rem"}}>
          <div>
            <div style={{margin: "0 0 1rem"}}>
              <FaHandPointer style={{color: "#1976d2", fontSize: "2.8rem"}} />
            </div>
            <h1 style={{fontWeight: "500", marginBottom: ".8rem"}}>Easy to use</h1>
            <p style={{marginBottom: "1rem", color: "#646765"}}>Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure.</p>
            <a style={{color: "#1976d2"}}>Learn more &gt; </a>
          </div>

          <div>
            <div style={{margin: "0 0 1rem"}}>
              <RocketLaunchIcon style={{color: "#1976d2", fontSize: "2.8rem"}}/>
            </div>
            <h1 style={{fontWeight: "500", marginBottom: ".8rem"}}>Faster Payments</h1>
            <p style={{marginBottom: "1rem", color: "#646765"}}>Persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure.</p>
            <a style={{color: "#1976d2"}}>Learn more &gt; </a>
          </div>

          <div>
            <div style={{margin: "0 0 1rem"}}>
              <AttachMoneyIcon style={{color: "#1976d2", fontSize: "2.8rem"}}/>                        
            </div>
            <h1 style={{fontWeight: "500", marginBottom: ".8rem"}}>Lower Fees</h1>
            <p style={{marginBottom: "1rem", color: "#646765"}}>Essent lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure.</p>
            <a style={{color: "#1976d2"}}>Learn more &gt; </a>
          </div>

          <div>
            <div style={{margin: "0 0 1rem"}}>
              <LockIcon style={{color: "#1976d2", fontSize: "2.8rem"}}/>  
            </div>                      
            <h1 style={{fontWeight: "500", marginBottom: ".8rem"}}>100% secure</h1>
            <p style={{marginBottom: "1rem", color: "#646765"}}>Quidam lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure.</p>
            <a style={{color: "#1976d2"}}>Learn more &gt; </a>
          </div>
        </div>
      </section>


      <section style={{backgroundColor: "#f1f5f6", margin: "3.5rem 0 3.5rem", padding: "3.5rem 1rem 0 1rem"}}>
        <div>
          <h1 style={{fontWeight: "500", width: "70%", fontSize: "2.04rem", marginBottom: "1rem"}}>Payment Solutions for everyone.</h1>
          <p style={{color: "#646765", lineHeight: "2rem", fontWeight: "400", fontSize: "1.2rem", marginBottom: "1rem"}}>Quidam lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure. Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure. lisque persius interesset his et, in quot quidam mea essent possim iriure.</p>
          <a style={{color: "#1976d2", fontSize: "1.1rem"}}>Find more solution &gt; </a>
        </div>

        <div style={{padding: "3rem 0", display: "flex", flexDirection: "column", gap: "1.6rem"}}>
          <div style={{position: "relative"}}>
            <img src={freelancer} alt="" style={{width: "100%", borderRadius: "5px"}} />
            <div style={{position: "absolute", bottom: "4px", background: "rgba(0, 0, 0, 0.5)", width: "100%", padding: "1rem 1rem", borderRadius: "5px"}}>
              <p style={{fontSize: "1.3rem", color: "#fff", textAlign: "center"}}>Freelancer</p>
            </div>
          </div>
          <div style={{position: "relative"}}>
            <img src={shopping} alt="" style={{width: "100%", borderRadius: "5px"}} />
            <div style={{position: "absolute", bottom: "4px", background: "rgba(0, 0, 0, 0.5)", width: "100%", padding: "1rem 1rem", borderRadius: "5px"}}>
              <p style={{fontSize: "1.3rem", color: "#fff", textAlign: "center"}}>Online Shopping</p>
            </div>
          </div>
          <div style={{position: "relative"}}>
            <img src={seller} alt="" style={{width: "100%", borderRadius: "5px"}} />
            <div style={{position: "absolute", bottom: "4px", background: "rgba(0, 0, 0, 0.5)", width: "100%", padding: "1rem 1rem", borderRadius: "5px"}}>
              <p style={{fontSize: "1.3rem", color: "#fff", textAlign: "center"}}>Online Sellers</p>
            </div>
          </div>
          <div style={{position: "relative"}}>
            <img src={affiliateMarketing} alt="" style={{width: "100%", borderRadius: "5px"}} />
            <div style={{position: "absolute", bottom: "4px", background: "rgba(0, 0, 0, 0.5)", width: "100%", padding: "1rem 1rem", borderRadius: "5px"}}>
              <p style={{fontSize: "1.3rem", color: "#fff", textAlign: "center"}}>Affliate Marketing</p>
            </div>
          </div>
        </div>
      </section>


      <section style={{textAlign: "center"}}>
        <h1 style={{fontSize: "2rem", marginBottom: ".6rem", fontWeight: "500"}}>What can you do with NairaNest?</h1>
        <p style={{lineHeight: "30px", fontWeight: "400", letterSpacing: ".2px", color: "#646765", padding: "0 2rem"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <div style={{margin: "2rem 0", display: "flex", flexDirection: "column"}}>
          <div style={{ margin: "1rem", borderRadius: "5px 5px 0 0", boxShadow: "0 0 4px 0 rgba(0,0,0,0.2)", transition: "0.3s"}}>
            <div style={{padding: "2rem"}}>
              <FaShareSquare style={{fontSize: "4rem", color: "#1976d2"}}/>
            </div>
            <div style={{background: "#f1f5f6", padding: "1rem"}}>
              <p>Send Money</p>
            </div>
          </div>

          <div style={{ margin: "1rem", borderRadius: "5px 5px 0 0", boxShadow: "0 0 4px 0 rgba(0,0,0,0.2)", transition: "0.3s"}}>
            <div style={{padding: "2rem"}}>
              <FaRegCheckSquare style={{fontSize: "4rem", color: "#1976d2"}}/>
            </div>
            <div style={{background: "#f1f5f6", padding: "1rem"}}>
              <p>Receive Money</p>
            </div>
          </div>

          <div style={{ margin: "1rem", borderRadius: "5px 5px 0 0", boxShadow: "0 0 4px 0 rgba(0,0,0,0.2)", transition: "0.3s"}}>
            <div style={{padding: "2rem"}}>
              <FaUserFriends style={{fontSize: "4rem", color: "#1976d2"}}/>
            </div>
            <div style={{background: "#f1f5f6", padding: "1rem"}}>
              <p>Pay a friend</p>
            </div>
          </div>

          <div style={{ margin: "1rem", borderRadius: "5px 5px 0 0", boxShadow: "0 0 4px 0 rgba(0,0,0,0.2)", transition: "0.3s"}}>
            <div style={{padding: "2rem"}}>
              <FaShoppingBag style={{fontSize: "4rem", color: "#1976d2"}}/>
            </div>
            <div style={{background: "#f1f5f6", padding: "1rem"}}>
              <p>Online Shopping</p>
            </div>
          </div>
        </div>

        <a style={{color: "#1976d2", fontSize: "1.1rem"}}>See more you can do &gt;</a>
      </section>


        {/* <video src='/src/assets/banking-video.mp4' width='500' height='500' autoPlay controls></video> */}

        {/* <iframe width="200"
          height="315"
          src="https://www.youtube.com/embed/KjqtDep5mT0?si=pLhKBOwJSLrRfiTe"
          title="YouTube video player"></iframe> */}

        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/7e90gBu4pas?si=G3PZM18fgmqMGbeX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}


      <section style={{backgroundColor: "#f1f5f6", margin: "3rem 0 3rem", padding: "3.5rem 1rem 3rem 1rem"}}>
        <div>
          <div>
            <VideoSection/>
          </div>
          <div style={{padding: "0 0 0 1rem"}}>
              <h1 style={{fontWeight: "500", width: "70%", fontSize: "2rem", margin: "2.5rem 0 1rem"}}>How does it work?</h1>
              <p style={{color: "#646765", lineHeight: "1.7rem", fontWeight: "400", fontSize: "1.1rem"}}>Quidam lisque persius interesset his et, in quot quidam persequeris essent possim iriure. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

              <div style={{color: "#646765", fontWeight: "400", fontSize: "1.1rem", margin: "1.5rem 0"}}>
                <p><ImCheckmark style={{color: "#4C4D4D"}}/> &nbsp;Sign Up Account</p>
                <p style={{marginTop: "1rem", lineHeight: "30px"}}><ImCheckmark style={{color: "#4C4D4D"}}/> &nbsp;Receive & Send Payments from worldwide</p>
                <p style={{marginTop: "1rem", lineHeight: "30px"}}><ImCheckmark style={{color: "#4C4D4D"}}/> &nbsp;Your funds will be transferred to your local bank account</p>
              </div>

              <button style={{fontWeight: "600", padding: ".8rem", border: "1px solid #1976D2", color: "#1976D2", fontSize: "1rem"}}>Open a Free Account</button>
          </div>
        </div>
      </section>

      <section style={{textAlign: "center"}}>
        <h1 style={{fontSize: "2.2rem", marginBottom: ".6rem", fontWeight: "500"}}>What people are saying about NairaNest</h1>
        <p style={{lineHeight: "30px", fontSize: "1.1rem", fontWeight: "300", letterSpacing: ".2px", color: "#646765", padding: "0 1.8rem"}}>A payments experience people love to talk about</p>
        <Swiper style={{margin: "1rem 0"}}></Swiper>
        <a style={{color: "#1976d2", fontSize: "1.1rem"}}>See more people review &gt;</a>
      </section>


      <section className="parallax-section">
        <h1 style={{fontSize: "2.2rem", fontWeight: "500"}}>Awesome Customer Support</h1>
        <p style={{fontSize: "1.3rem", fontWeight: "300", lineHeight: "30px", margin: "1rem 0 1.5rem"}}>Have you any query? Don&#39;t worry. We have great people ready to help you whenever you need it.</p>
        <button style={{backgroundColor: "#fff", color: "#1976D2", fontSize: "1rem", fontWeight: "600", padding: "1rem 2rem"}}>Find out more</button>
      </section>


      <section style={{backgroundColor: "#f1f5f6", margin: "0 0 1rem", padding: "3rem .1rem 3rem .1rem", textAlign: "center"}}>
        <h1 style={{fontSize: "2.2rem", marginBottom: ".6rem", fontWeight: "500"}}>Get the app</h1>
        <p style={{lineHeight: "35px", fontWeight: "330", letterSpacing: ".2px", color: "#646765", padding: "0 1.3rem", fontSize: "1.24rem"}}>Download our app for the fastest, most convenient way to send & get Payment.</p>
        <div style={{margin: "1.5rem 0 0", display: "flex", flexDirection: "column", gap: ".5rem"}}>
          <div>
            <img src={appStore} alt="" />
          </div>
          <div>
            <img src={googlePlay} alt="" />
          </div>
        </div>
      </section>


      <footer style={{padding: "3rem 1rem 3rem 1rem"}}>
        <div style={{display: "flex", flexDirection: "column", gap: ".7rem"}}>
          <a>About us</a>
          <a>Support</a>
          <a>Help</a>
          <a>Careers</a>
          <a>Affliate</a>
          <a>Fees</a>
        </div>

        <div style={{margin: "1rem 0 .5rem", display: "flex", flexDirection: "row", gap: ".6rem"}}>
          <FaFacebookF style={{color: "#4d555a", fontSize: "1.5rem"}} />
          <Twitter style={{color: "#4d555a", fontSize: "1.5rem"}} />
          <Google style={{color: "#4d555a", fontSize: "1.5rem"}} />
          <YouTube style={{color: "#4d555a", fontSize: "1.5rem"}} />
        </div>

        <hr/>

        <div style={{margin: "1rem 0 0"}}>
          <p>Copyright © 2024 NairaNest. All Rights Reserved.</p>
          <div style={{margin: "1rem 0 0", display: "flex", flexDirection: "column", gap: ".7rem"}}>
            <p>Security</p>
            <p>Terms</p>
            <p>Privacy</p>
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
    </>
  );
};

export default Homepage;
