import { useEffect, useState } from 'react';

import MESSAGES from '../messages';
import Container from './Container';
import PizzaImage from './PizzaImage';
// @ts-ignore
import musicFile from './some_say_no.mp3';

interface FlyingPizza {
  x: number;
  y: number;
  dx: number;
  dy: number;
  text: string;
  author: string;
}

// const PIZZA_TEXTS: Array<string> = [
//   "I really loved working with you Paras!",
//   "You're the best Paras!",
//   "I remember that one time!!",
// ];

const MIN_COORD = -0.1;
const MAX_COORD = 1.1;
const MAX_SPEED = 0.001;
const FRAME_RATE = 60;
const FRAME_DELAY = 1000 / FRAME_RATE;

const SIMULTANEOUS_PIZZAS = 6;
const INITIAL_PIZZAS = new Array(SIMULTANEOUS_PIZZAS)
  .fill(null)
  .map(createPizza);

export default function App() {
  const [started, setStarted] = useState(false);
  const [pizzas, setPizzas] = useState(INITIAL_PIZZAS);

  // Play music
  useEffect(() => {
    if (!started) return;
    const audio = new Audio(musicFile);
    audio.loop = true;
    audio.play();
    return () => audio.pause();
  }, [started]);

  // Move pizzas
  useEffect(() => {
    if (!started) return;
    const interval = setInterval(
      () =>
        setPizzas((existingPizzas) => {
          const newPizzas = existingPizzas.map(movePizza).filter(isInBounds);
          while (newPizzas.length < existingPizzas.length) {
            newPizzas.push(createPizza());
          }
          return newPizzas;
        }),
      FRAME_DELAY
    );

    return () => clearInterval(interval);
  }, [started]);

  return (
    <Container>
      {started ? (
        pizzas.map(({ text, author, x, y }, i) => (
          <PizzaImage
            key={i}
            text={text}
            author={author}
            x={x}
            y={y}
            index={i}
          />
        ))
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

function createPizza(): FlyingPizza {
  const { x, y } = getStartPoint();
  const speed = randFloat(0.7, 1) * MAX_SPEED;
  const dx = (randFloat(0.4, 0.6) - x) * speed;
  const dy = (randFloat(0.4, 0.6) - y) * speed;

  const author = sample(Object.keys(MESSAGES));
  const text = MESSAGES[author];

  return { x, y, dx, dy, author, text };
}

function movePizza(pizza: FlyingPizza): FlyingPizza {
  // Using mutable data here to make things faster
  pizza.x = pizza.x + pizza.dx;
  pizza.y = pizza.y + pizza.dy;
  return pizza;
}
