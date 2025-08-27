import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="w-full p-4 min-h-[85vh] flex flex-col justify-center items-center">
      <div className="flex flex-col gap-5 md:w-[50%] text-center">
        <h1 className="text-3xl text-gray-900 font-bold">Welcome to FinTrack</h1>
        <p className="text-xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, incidunt. Quam culpa eaque.</p>
        <Link to="/auth/login" className="mt-5">
          <Button> Access Your Account <ArrowRight /></Button>
        </Link>
      </div>
    </main>
  );
}
