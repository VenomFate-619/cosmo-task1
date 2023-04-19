import { useState, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div
              ref={modalRef}
              className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md"
            >
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current"
                  >
                    <path
                      className="heroicon-ui"
                      d="M6.7 5.3a1 1 0 011.4 0L12 10.6l3.9-5.3a1 1 0 111.4 1.4L13.4 12l4.1 5.3a1 1 0 01-1.4 1.4L12 13.4l-3.9 5.3a1 1 0 01-1.4 0 1 1 0 010-1.4L10.6 12 6.5 6.7a1 1 0 010-1.4z"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-4">{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
