import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./TestimonialSection.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialSection = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "2.2rem", marginBottom: ".6rem", fontWeight: "500" }}>
        What people are saying about NairaNest
      </h1>
      <p
        style={{
          lineHeight: "30px",
          fontSize: "1.15rem",
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
          1024: { slidesPerView: 3 }, // For larger screens, show 2 or 3 slides
        }}
        className="swiper"
        style={{ padding: "1.5rem 1rem", position: "relative" }}
      >
        <SwiperSlide>
          <div style={testimonialCardStyle}>
            <FaQuoteLeft style={{ color: "#E7EBEC", fontSize: "2.5rem" }} />
            <p style={{ color: "#595959", margin: ".5rem 0", lineHeight: "30px" }}>“I am happy working with NairaNest. Easy to use and it make my payments so seamless and stress-free! They also have an amazing user experience!”</p>
            <div style={{ margin: "1rem 0" }}>
              <h1 style={{ fontSize: "1rem", color: "#4C4C4C" }}>Jay Shah</h1>
              <p style={{ color: "#A3A4A6", margin: ".5rem 0" }}>Freelancer</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div style={testimonialCardStyle}>
            <FaQuoteLeft style={{ color: "#E7EBEC", fontSize: "2.5rem" }} />
            <p style={{ color: "#595959", margin: ".5rem 0", lineHeight: "30px" }}>“Fast easy to use transfers to a different currency. Much better value than the regular banks.”</p>
            <div style={{ margin: "1rem 0" }}>
              <h1 style={{ fontSize: "1rem", color: "#4C4C4C" }}>De Mortel</h1>
              <p style={{ color: "#A3A4A6", margin: ".5rem 0" }}>Online Retail</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div style={testimonialCardStyle}>
            <FaQuoteLeft style={{ color: "#E7EBEC", fontSize: "2.5rem" }} />
            <p style={{ color: "#595959", margin: ".5rem 0", lineHeight: "30px" }}>“I have used them twice now. Good rates, very efficient service and it denies high street banks an undeserved windfall. Excellent.”</p>
            <div style={{ margin: "1rem 0" }}>
              <h1 style={{ fontSize: "1rem", color: "#4C4C4C" }}>Chris Tom</h1>
              <p style={{ color: "#A3A4A6", margin: ".5rem 0" }}>User from UK</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div style={testimonialCardStyle}>
            <FaQuoteLeft style={{ color: "#E7EBEC", fontSize: "2.5rem" }} />
            <p style={{ color: "#595959", margin: ".5rem 0", lineHeight: "30px" }}>“It&apos;s a real good idea to manage your money by NairaNest. The rates are fair and you can carry out the transactions without worrying!”</p>
            <div style={{ margin: "1rem 0" }}>
              <h1 style={{ fontSize: "1rem", color: "#4C4C4C" }}>Mauri Lindberg</h1>
              <p style={{ color: "#A3A4A6", margin: ".5rem 0" }}>Freelancer from Australia</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div style={testimonialCardStyle}>
            <FaQuoteLeft style={{ color: "#E7EBEC", fontSize: "2.5rem" }} />
            <p style={{ color: "#595959", margin: ".5rem 0", lineHeight: "30px" }}>“Only trying it out since a few days. But up to now excellent. Seems to work flawlessly. I&#39;m only using it for sending money to friends at the moment.”</p>
            <div style={{ margin: "1rem 0" }}>
              <h1 style={{ fontSize: "1rem", color: "#4C4C4C" }}>Dennis Jacques</h1>
              <p style={{ color: "#A3A4A6", margin: ".5rem 0" }}>User from USA</p>
            </div>
          </div>
        </SwiperSlide>

        <span className="custom-prev"><FaAngleLeft style={{ fontSize: "1.3rem" }} /></span>
        <span className="custom-next"><FaAngleRight style={{ fontSize: "1.3rem" }} /></span>
      </Swiper>
      <div className="custom-dots"></div>
      <a style={{ color: "#1976d2", fontSize: "1.1rem", cursor: "pointer" }}>See more people review &gt;</a>
    </div>
  );
};

const testimonialCardStyle = {
  background: "#fff",
  borderRadius: "5px",
  padding: "2rem 2rem",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
};

export default TestimonialSection;

