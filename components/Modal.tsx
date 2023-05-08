import React, { useRef } from "react";
import { useEscapeKey } from "../@hooks/useEscapeKey";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
};

// Modal component
export const Modal: React.FC<ModalProps> = ({
  children, onClose, ariaLabelledby, ariaDescribedby,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Function to handle click outside the modal content
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click is outside the modal content
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Hook to handle the escape key press
  useEscapeKey(onClose);

  // Render the modal component
  return (
    <div
      className="modal"
      onClick={handleClickOutside}
      role="dialog"
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      tabIndex={-1}
      onFocus={() => contentRef.current?.focus()} // Set focus to the modal content
    >
      <div className="modal-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};
