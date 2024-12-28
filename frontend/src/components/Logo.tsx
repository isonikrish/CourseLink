import { Book } from "lucide-react";

function Logo() {
  return (
    <div>
      <div className="flex-1 flex items-center space-x-2">
        <Book className="text-xl" />
        <a className="text-xl cursor-pointer font-semibold transition duration-300 ease-in-out">
          CourseLink
        </a>
      </div>
    </div>
  );
}

export default Logo;
