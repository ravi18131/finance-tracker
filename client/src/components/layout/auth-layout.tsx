import React from "react";
import { Card } from "../ui/card";
import { useSession } from "@/store/session.store";
import { Navigate } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user } = useSession();
  if (user?.id) {
    return <Navigate to="/admin" replace />;
  }
  const date = new Date();
  return (
    <div className="font-[sans-serif] bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/images/login-bg.jpg')] bg-cover no-repeat bg-center">
      <div className="min-h-screen flex fle-col items-center justify-center lg:p-6 p-4">
        <Card className="bg-white rounded-xl px-6 py-8 max-w-md mx-auto w-full">
          {/* Uncomment to use the logo */}
          {/* <img
            src="/images/logo_black.png"
            alt="logo"
            className="w-48 mx-auto"
          /> */}
          <h1 className="text-2xl text-center font-bold text-primary mt-4">
            Admin Portal
          </h1>
          <div>{children}</div>
        </Card>
      </div>
      <div className="block sm:fixed bottom-3 w-full ">
        <p className="text-white text-center mt-6">
          &copy; {date.getFullYear()} AMCE. All rights reserved.
        </p>
        <p className="text-white text-center mt-0">
          Powered by{" "}
          <a href="#" target="_blank" className="text-primary">
            <span className="text-white underline">AMCE</span>
          </a>
        </p>
      </div>
    </div>
  );
}
