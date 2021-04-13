import pizzaImg from './pizza-slice.png';

interface Props {
  text: string;
  author: string;
  x: number;
  y: number;
  r: number;
  speed: number;
  isHovered: boolean;
  onMouseEnter: (author: string) => void;
  onMouseLeave: () => void;
}

export default function PizzaImage({
  text,
  author,
  x,
  y,
  r,
  speed,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  return (
    <div
      className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        top: `${100 * y}%`,
        left: `${100 * x}%`,
        width: Math.floor(240 + 300000 * speed),
        height: Math.floor(160 + 200000 * speed),
        zIndex: Math.floor(1000000 * speed),
      }}
      onMouseEnter={() => onMouseEnter(author)}
      onMouseLeave={onMouseLeave}
    >
      <img
        alt="pizza"
        className="absolute"
        src={pizzaImg}
        style={{ transform: `rotate(${r}deg)` }}
      />
      <div
        className={`z-10 w-56 p-2 text-xs bg-white rounded cursor-default ${
          isHovered ? "" : "bg-opacity-80 opacity-80"
        }`}
      >
        {text} - <strong>{author}</strong>
      </div>
    </div>
  );
}
