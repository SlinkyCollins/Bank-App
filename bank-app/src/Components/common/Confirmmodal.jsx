// ConfirmModal.js
import Modal from 'react-modal';

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Logout"
      ariaHideApp={false} // This is important if you don't want to hide your app during testing
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },

      }}
    >
      <h2>Confirm Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default ConfirmModal;
