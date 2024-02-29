import { cloneElement, createContext, useContext, useState } from "react";
import { HiX } from "react-icons/hi";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // clones Button
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center backdrop-blur-md">
      <div ref={ref} className="w-100% relative rounded-lg bg-stone-300 p-5">
        <button onClick={close} className="absolute right-2 top-2 ">
          <HiX />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
