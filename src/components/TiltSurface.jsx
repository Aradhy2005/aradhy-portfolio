import { useRef } from "react";

export default function TiltSurface({ children, className = "", cursorLabel = "OPEN" }) {
  const ref = useRef(null);

  const tilt = (event) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg) translateY(-3px)`;
  };

  const reset = () => {
    ref.current.style.transform = "";
  };

  return <div ref={ref} className={`tilt-surface ${className}`} data-cursor={cursorLabel} onMouseMove={tilt} onMouseLeave={reset}>{children}</div>;
}
