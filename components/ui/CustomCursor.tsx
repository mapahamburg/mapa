"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let cx = -40;
    let cy = -40;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;

      if (!visible) {
        dot.style.opacity = "1";
        visible = true;
      }

      // Scale up on interactive elements
      const target = e.target as Element;
      const interactive = target.closest("a, button, [role=button], input, textarea, select, label");
      dot.style.transform = `translate(${cx}px, ${cy}px) scale(${interactive ? 1.9 : 1})`;
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      visible = false;
    };

    const onEnter = () => {
      dot.style.opacity = "1";
      visible = true;
    };

    // Initial placement off-screen until first move
    dot.style.transform = `translate(-40px, -40px) scale(1)`;

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         10,
        height:        10,
        marginTop:     -5,
        marginLeft:    -5,
        borderRadius:  "50%",
        background:    "var(--cobalt-500)",
        pointerEvents: "none",
        zIndex:        99999,
        opacity:       0,
        transition:    "opacity 200ms ease, transform 80ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange:    "transform",
      }}
    />
  );
}
