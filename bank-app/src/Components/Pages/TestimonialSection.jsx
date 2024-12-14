import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./TestimonialSection.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const TestimonialSection = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "2.2rem", marginBottom: ".6rem", fontWeight: "500" }}>
        What people are saying about NairaNest
      </h1>
      <p
        style={{
          lineHeight: "30px",
          fontSize: "1.1rem",
          fontWeight: "300",
          letterSpacing: ".2px",
          color: "#646765",
          padding: "0 1.8rem",
        }}
      >
        A payments experience people love to talk about
      </p>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
        }}
        pagination={{ 
            clickable: true,
            el: '.custom-dots',
        }}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
            delay: 3500,
            disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 }, // For small screens, show 1 slide
          768: { slidesPerView: 2 }, // For tablets, show 2 slides
          1024: { slidesPerView: 2 }, // For larger screens, show 2 or 3 slides
        }}
        className="swiper"
        style={{ margin: "3rem 0" }}
      >
        <SwiperSlide>
          <div style={testimonialCardStyle}>
            <p>NairaNest made my payments so seamless and stress-free!</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={testimonialCardStyle}>
            <p>Fantastic service and support. Highly recommend!</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={testimonialCardStyle}>
            <p>The best payment solution I&#34;ve used in a long time.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={testimonialCardStyle}>
            <p>Amazing user experience! Truly exceptional.</p>
          </div>
        </SwiperSlide>
      <button className="custom-prev"><FaAngleLeft /></button>
      <button className="custom-next"><FaAngleRight /></button>
      </Swiper>
      <div className="custom-dots"></div>
      <a style={{ color: "#1976d2", fontSize: "1.1rem", cursor: "pointer" }}>See more people review &gt;</a>
    </div>
  );
};

const testimonialCardStyle = {
  background: "#f9f9f9",
  borderRadius: "10px",
  padding: "1.5rem",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
};

export default TestimonialSection;

