import { useState } from 'react';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IoPlay } from "react-icons/io5";
import "./VideoSection.css";
import thumbnailImg from "/src/assets/banking2.jpg";


const VideoSection = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div>
        {/* Video Placeholder */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            cursor: "pointer",
          }}
        >
          <img
            src={thumbnailImg}
            alt="Video Thumbnail"
            style={{ width: "100%", borderRadius: "5px" }}
          />
          
          <div className="pulse-button">
            <span
             onClick={handleOpen}
            >
               <IoPlay />
            </span>
          </div>
          
        </div>
      </div>

      {/* Modal for Video */}
      <Modal open={open} onClose={handleClose}>
        
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "700px",
            borderRadius: "5px",
          }}
        >
          <iframe
            width="100%"
            height="162"
            src="https://www.youtube.com/embed/7e90gBu4pas?si=G3PZM18fgmqMGbeX?autoplay=1" 
            title="How it works"
            frameBorder="0px"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>

         <CloseIcon
            onClick={handleClose}
            style={{
                position: "absolute",
                top: "-35px",
                color: "#fff",
                right: "-10px",
                cursor: "pointer",
                fontSize: "2rem"
            }}
         />
        </div>

      </Modal>
    </div>
  );
};

export default VideoSection;
