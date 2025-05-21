import { useEffect, useRef } from "react";

type CardProps = {
  onClick: () => void;
  imageUrl: string;
};

const Card2 = ({ onClick, imageUrl }: CardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!container || !overlay) return;

    const handleMouseMove = (e: MouseEvent) => {
      let x = e.offsetX;
      let y = e.offsetY;
      let rotateY = (-1 / 5) * x + 20;
      let rotateX = (4 / 30) * y - 20;

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

      <style>
        {`
          .container {
            width: 220px;
            height: 310px;
            transition: all 0.1s;
            position: relative;
          }
          .overlay {
            position: absolute;
            width: 220px;
            height: 310px;
            background: linear-gradient(
              105deg,
              transparent 40%,
              rgba(48, 57, 53, 0.6) 45%,
              rgba(34, 45, 40, 0.6) 45%,
              transparent 54%
            );
            filter: brightness(1.1) opacity(0.8);
            mix-blend-mode: color-dodge;
            background-size: 150% 150%;
            background-position: 100%;
            transition: all 0.1s;
          }
          .card {
            width: 220px;
            height: 310px;
            background-image: url(https://i.pinimg.com/736x/5f/6e/f0/5f6ef0bb33d7925328e49e6e32064dd0.jpg);
            background-size: cover;
          }
        `}
      </style>
    </>
  );
};

export default Card2;
