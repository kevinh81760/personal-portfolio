import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isClicked, setIsClicked] = useState(false);
  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const followMouse = () => {
      const update = () => {
        const size = isClicked ? 24 : 36;
        const offset = size / 2;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${mouse.current.x - offset}px, ${mouse.current.y - offset}px)`;
          cursorRef.current.style.width = `${size}px`;
          cursorRef.current.style.height = `${size}px`;
        }

        requestAnimationFrame(update);
      };

      update();
    };

    followMouse();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isClicked]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-white transition-[width,height] duration-400 ease-in-out"
    />
  );
}
