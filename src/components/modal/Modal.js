import { useRef } from "react";
import "./modal.scss";
import "boxicons";

function Modal({ active, id, children }) {
  return (
    <div id={id} className={`modal ${active ? active : ""}`}>
      {children}
    </div>
  );
}

export const ModalContent = ({ onClose, children }) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("active");
    if (onClose) onClose();
  };

  return (
    <div ref={contentRef} className="modal__content">
      {children}
      <div className="modal__content__close" onClick={closeModal}>
        <box-icon name="x"></box-icon>
      </div>
    </div>
  );
};

export default Modal;
