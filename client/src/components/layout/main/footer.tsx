import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="py-4 border-t border-gray-800 bg-gray-950">
      <div className="container mx-auto px-4 ">
        <div className="mt-8 pt-8 mb-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} FinTrack. Released under
            the MIT License.
          </p>
          <p>
            Made with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            by{" "}
            <Link
              to="https://www.linkedin.com/in/ravi18131/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors underline"
            >
              Ravi Kumar
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
