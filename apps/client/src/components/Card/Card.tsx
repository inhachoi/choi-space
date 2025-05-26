import { useEffect, useRef } from "react";
import "./Card.css";
import type { CardProps } from "../../types/card";

const Card = ({ onClick, imageUrl }: CardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!container || !overlay) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;
      const rotateY = (-1 / 5) * x + 20;
      const rotateX = (4 / 30) * y - 20;

      overlay.style.backgroundPosition = `${x / 5 + y / 5}%`;
      container.style.transform = `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseOut = () => {
      overlay.style.backgroundPosition = "100%";
      container.style.transform =
        "perspective(350px) rotate(0deg) rotateX(0deg)";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseout", handleMouseOut);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div className="container" onClick={onClick} ref={containerRef}>
        <div className="overlay" ref={overlayRef}></div>
        <div
          className="card"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </div>
    </>
  );
};

export default Card;
