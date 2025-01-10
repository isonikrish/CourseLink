import { Book } from "lucide-react";

function Logo() {
  return (
    <div>
      <div className="flex-1 flex items-center space-x-2 justify-center">
        <Book className="text-xl" />
        <div className="text-xl cursor-pointer font-semibold transition duration-300 ease-in-out">
          CourseLink
        </div>
      </div>
    </div>
  );
}

export default Logo;
