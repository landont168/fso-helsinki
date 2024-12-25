import { CoursePart } from "../types";
import Part from "./Part";

const Header = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.name}>
          <Part part={part} />
        </p>
      ))}
    </div>
  );
};

export default Header;
