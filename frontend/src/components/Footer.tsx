import { Github, Heart, } from "lucide-react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";

export function Footer() {
  return (
    <footer className="py-8">
      <div className="h-[3px] bg-gradient-to-r from-gray-400 via-gray-200 to-gray-600 my-10"></div>
      <div className="container mx-auto px-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
        <Logo />
          <p className="text-sm text-gray-600">
            Made with <Heart className="inline-block h-4 w-4 text-red-500" /> by Krish Soni
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="https://github.com/isonikrish/CourseLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            to="https://x.com/isonikrish"

            rel="noopener noreferrer"
          >
            <FaXTwitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          
        </div>

        <div className="text-sm text-gray-600">

          <p>© {new Date().getFullYear()} CourseLink. All rights reserved.</p>
        </div>
      </div>
      
    </footer>
  );
}
