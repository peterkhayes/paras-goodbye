import pizzaImg from './pizza-slice.png';

interface Props {
  text: string;
  author: string;
  x: number;
  y: number;
  index: number;
}

export default function PizzaImage({ text, author, x, y, index }: Props) {
  // TODO: transforms to center?
  return (
    <div
      className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 w-96 h-72"
      style={{ top: `${100 * y}%`, left: `${100 * x}%`, zIndex: index }}
    >
      <img alt="pizza" className="absolute inset-0" src={pizzaImg} />
      <div className="relative z-10 w-56 p-2 text-xs bg-white rounded bg-opacity-70 -top-4">
        <em>{text}</em> - <strong>{author}</strong>
      </div>
    </div>
  );
}
