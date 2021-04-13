import { useCallback, useEffect, useRef, useState } from 'react';

import MESSAGES from '../messages';
import Container from './Container';
import parasImg from './paras.svg';
import PizzaImage from './PizzaImage';
// @ts-ignore
import musicFile from './some_say_no_lopass.mp3';

interface FlyingPizza {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
  dr: number;
  speed: number;
  text: string;
  author: string;
}

/*
 * reduce music volume and maybe put a low pass filter on it
 */

const MIN_COORD = -0.2;
const MAX_COORD = 1.2;
const MAX_SPEED = 0.0008;
const FRAME_RATE = 60;
const FRAME_DELAY = 1000 / FRAME_RATE;
const GENERATION_SPEED = 2000;
const SIMULTANEOUS_PIZZAS = 10;

export default function App() {
  const [started, setStarted] = useState(false);
  const [pizzas, setPizzas] = useState([createPizza()!]);
  const hoveredPizzaRef = useRef<string | null>(null);

  // Play music
  useEffect(() => {
    if (!started) return;
    const audio = new Audio(musicFile);
    audio.loop = true;
    audio.play();
    return () => audio.pause();
  }, [started]);

  // Generate new pizzas
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(
      () =>
        setPizzas((existingPizzas) => {
          if (existingPizzas.length >= SIMULTANEOUS_PIZZAS)
            return existingPizzas;

          const newPizza = createPizza(existingPizzas);
          if (newPizza) {
            return existingPizzas.concat(newPizza);
          } else {
            return existingPizzas;
          }
        }),
      GENERATION_SPEED
    );

    return () => clearInterval(interval);
  }, [started]);

  // Move pizzas
  useEffect(() => {
    if (!started) return;
    const interval = setInterval(
      () =>
        setPizzas((existingPizzas) => {
          return existingPizzas
            .map((pizza) =>
              pizza.author === hoveredPizzaRef.current
                ? pizza
                : movePizza(pizza)
            )
            .filter(isInBounds);
        }),
      FRAME_DELAY
    );

    return () => clearInterval(interval);
  }, [started]);

  const onMouseEnterPizza = useCallback((author: string) => {
    hoveredPizzaRef.current = author;
  }, []);
  const onMouseLeavePizza = useCallback(() => {
    hoveredPizzaRef.current = null;
  }, []);

  return (
    <Container>
      {started ? (
        <>
          <img
            src={parasImg}
            alt="Goodbye Paras"
            style={{ width: "70%" }}
            className="opacity-20"
          />
          {pizzas.map(({ text, author, x, y, r, speed }, i) => (
            <PizzaImage
              key={i}
              text={text}
              author={author}
              x={x}
              y={y}
              r={r}
              speed={speed}
              isHovered={hoveredPizzaRef.current === author}
              onMouseEnter={onMouseEnterPizza}
              onMouseLeave={onMouseLeavePizza}
            />
          ))}
        </>
      ) : (
        <button
          className="p-4 bg-white rounded"
          onClick={() => setStarted(true)}
        >
          Start
        </button>
      )}
    </Container>
  );
}

function randInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randFloat(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function sample<X>(arr: Array<X>): X {
  return arr[randInt(arr.length)];
}

function getStartPoint(): { x: number; y: number } {
  const side = randInt(4);
  switch (side) {
    case 0:
      // top
      return { x: Math.random(), y: MIN_COORD };
    case 1:
      // bottom
      return { x: Math.random(), y: MAX_COORD };
    case 2:
      // left
      return { x: MIN_COORD, y: Math.random() };
    default:
      // right
      return { x: MAX_COORD, y: Math.random() };
  }
}

function isInBounds({ x, y }: { x: number; y: number }) {
  return x >= MIN_COORD && x <= MAX_COORD && y >= MIN_COORD && y <= MAX_COORD;
}

function createPizza(
  existingPizzas: Array<FlyingPizza> = []
): FlyingPizza | null {
  const author = sample(
    Object.keys(MESSAGES).filter((author) =>
      existingPizzas.every((p) => p.author !== author)
    )
  );
  if (author == null) return null;

  const { x, y } = getStartPoint();
  const speed = randFloat(0.2, 1) * MAX_SPEED;
  const dx = (randFloat(0.4, 0.6) - x) * speed;
  const dy = (randFloat(0.4, 0.6) - y) * speed;
  const r = randInt(360);
  const dr = 0.1;

  const text = MESSAGES[author];

  return { x, y, speed, dx, dy, r, dr, author, text };
}

function movePizza(pizza: FlyingPizza): FlyingPizza {
  // Using mutable data here to make things faster
  pizza.x = pizza.x + pizza.dx;
  pizza.y = pizza.y + pizza.dy;
  pizza.r = pizza.r + pizza.dr;
  return pizza;
}
