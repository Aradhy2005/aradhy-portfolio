import { useRef } from "react";

export default function MagneticButton({ children, className = "", href, onClick, target, rel, ariaLabel }) {
  const ref = useRef(null);

  const move = (event) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    ref.current.style.transform = `translate3d(${x * 0.14}px, ${y * 0.14}px, 0)`;
  };

  const reset = () => {
    ref.current.style.transform = "";
  };

  const props = {
    ref,
    className: `magnetic ${className}`,
    onMouseMove: move,
    onMouseLeave: reset,
    onClick,
    "aria-label": ariaLabel,
  };

  return href ? <a {...props} href={href} target={target} rel={rel}>{children}</a> : <button {...props}>{children}</button>;
}
