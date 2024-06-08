import { useState } from "react";

const Modal = ({ show, onClose, onConfirm }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 200); // Duration should match the exit animation duration
  };

    if (!show) return null;

  return (
    <div className={`modal-overlay ${isExiting ? 'fadeOut' : 'fadeIn'}`} onClick={handleClose}>
        <div className={`modal ${isExiting ? 'slideOut' : 'slideIn'}`} onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Logout</h2>
            <hr />
            <p>Are you sure you want to log out?</p>
            <button onClick={onConfirm} className="yes-btn">OK</button>
            <button onClick={handleClose} className="cancel-btn">Cancel</button>
        </div>
    </div>
  )
}

export default Modal