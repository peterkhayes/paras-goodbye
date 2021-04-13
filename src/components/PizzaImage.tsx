import pizzaImg from './pizza-slice.png';

interface Props {
  text: string;
  author: string;
  x: number;
  y: number;
  r: number;
  distance: number;
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
  distance,
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
        width: 90000 / distance,
        height: 60000 / distance,
        zIndex: Math.floor(100000 - (isHovered ? 0 : distance)),
      }}
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
        onMouseEnter={() => onMouseEnter(author)}
        onMouseLeave={onMouseLeave}
      >
        {text} - <strong>{author}</strong>
      </div>
    </div>
  );
}
