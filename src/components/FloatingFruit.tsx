interface FloatingFruitProps {
  emoji: string;
  delay?: number;
  left?: string;
  top?: string;
  size?: string;
}

const FloatingFruit = ({ emoji, delay = 0, left = "10%", top = "20%", size = "text-6xl" }: FloatingFruitProps) => {
  const animationClass = delay % 2 === 0 ? "animate-float" : "animate-float-delayed";
  
  return (
    <div
      className={`absolute ${size} opacity-20 ${animationClass}`}
      style={{
        left,
        top,
        animationDelay: `${delay}s`,
      }}
    >
      {emoji}
    </div>
  );
};

export default FloatingFruit;
