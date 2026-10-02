import { useEffect, useState } from "react";

export function useMousePosition() {
  const [position, setPosition] = useState({ x: -100, y: -100, label: "" });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (event) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
      const target = event.target.closest("[data-cursor], a, button");
      const externalLink = target?.matches("a[target='_blank']");
      setPosition({
        x: event.clientX,
        y: event.clientY,
        label: target?.getAttribute("data-cursor") || (externalLink ? "↗" : target ? "OPEN" : ""),
      });
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return position;
}
