import ReactDOM from "react-dom";
import { useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { ModalProps } from "./types";

const Modal = ({ isOpen, setOpen, modalTitle, children }: ModalProps) => {
  useEffect(() => {
    const closeModal = (e: any) => {
      if (e.code == "27" || e.target.classList.contains("modal-backdrop")) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", closeModal);
    window.addEventListener("click", closeModal);

    return () => {
      window.removeEventListener("keydown", closeModal);
      window.removeEventListener("click", closeModal);
    };
  }, []);

  return isOpen
    ? ReactDOM.createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-backdrop px-5 flex justify-center items-center h-screen w-screen fixed top-0 left-0 right-0 bottom-0 z-10"
          style={{ background: "rgba(255, 255, 255, 0.8)" }}
        >
          <motion.div
            key="modal"
            className="w-full md:w-3/4 lg:w-1/2 bg-white rounded-3xl shadow-2xl border-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <div className="flex items-center border-b-2 border-gray-200 p-2">
              <h1 className="text-xl font-bold w-full text-center text-gray-600 ">
                {modalTitle}
              </h1>
              <a href="#!" onClick={() => setOpen(false)}>
                <XIcon className="text-gray-700 h-10 w-10 p-3 bg-gray-300 rounded-full hover:bg-gray-400" />
              </a>
            </div>
            {children}
          </motion.div>
        </motion.div>,
        document.querySelector("#modal") as Element
      )
    : null;
};

export default Modal;
