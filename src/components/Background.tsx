import { useEffect, useRef } from "react";

/** Slowly drifting starfield plus a soft glow that follows the cursor. */
export default function Background() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (glow.current) glow.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div className="field" aria-hidden />
      <div className="glow" ref={glow} aria-hidden />
    </>
  );
}
