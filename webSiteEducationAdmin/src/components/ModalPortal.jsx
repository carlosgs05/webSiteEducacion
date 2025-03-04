import { createPortal } from "react-dom";

const ModalPortal = ({ children }) => {
  // Esto inserta `children` dentro de <div id="modal-root"></div>
  return createPortal(children, document.getElementById("modal-root"));
};

export default ModalPortal;