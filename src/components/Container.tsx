import spaceImg from './space.png';

interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black bg-repeat bg-animation"
      style={{ backgroundImage: `url(${spaceImg})` }}
    >
      {children}
    </div>
  );
}
