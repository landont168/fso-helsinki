interface Part {
  name: string;
  exerciseCount: number;
}

const Header = ({ parts }: { parts: Part[] }) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Header;
