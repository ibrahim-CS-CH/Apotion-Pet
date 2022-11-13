import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
    const ref = useRef(null);
    if (!ref.current) {
        ref.current = document.createElement("div");
    }
    useEffect( () =>{
        const modelRoot = document.getElementById("modal");
        modelRoot.appendChild(ref.current);
        return ()=>{modelRoot.removeChild(ref.current)}
    },[]);

    return createPortal(children, ref.current)
}
export default Modal;