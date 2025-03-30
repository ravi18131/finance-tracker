import { Code, Github } from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="py-12 border-t border-gray-800 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              TS React+Node Starter
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link
              to="#features"
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              to="#why-use"
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              Why Use
            </Link>
            <Link
              to="#opensource"
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              Open Source
            </Link>
            <Link
              to="#get-started"
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="https://github.com/yourusername/ts-react-starter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} TS React+Node Starter. Released under
            the MIT License.
          </p>
          <p>
            Made with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            by{" "}
            <Link
              to="https://github.com/ankitarima"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors underline"
            >
              ankitarima
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
