import React from "react";
import { Modal } from "./Modal";

type SuccessModalProps = {
  message: string;
  onClose: () => void;
};

export const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="column-flex-box">
        <h2 style={{ textAlign: "center" }}>Success!</h2>
        <p>{message}</p>
        <button onClick={onClose} className="dismiss-success-modal-button">
          Close
        </button>
      </div>
    </Modal>
  );
};
