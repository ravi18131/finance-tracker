import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed w-full z-50 border-b bg-white shadow-lg backdrop-blur-sm">
      <nav className="py-2.5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-2 mx-auto">
          <Link to="/" className="flex items-center">
            <Link to="/" className="">
              <img src="/images/fintrack_logo.png" alt=" FinTrack" className="w-48 h-auto" />
            </Link>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/auth/login"
              rel="noopener noreferrer"
            >
              <Button><User />Login</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
