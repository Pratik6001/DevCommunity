import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
export default function HomeLayout() {
  return (
    <div className="min-h-screen  text-white">
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
