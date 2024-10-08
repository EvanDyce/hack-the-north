"use client";
import React, { useState } from "react";
import Completion from "./components/completion";
import Logo from "./components/logo";
import "./globals.css";

const gradientStyle = {
  background: "linear-gradient(-45deg, #7d97f9, #90dcc2, #7d97f9, #ff9ad5)",
  backgroundSize: "400% 400%",
  animation: "gradient 15s ease infinite",
};

const keyframes = `
  @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
  }
`;

export default function Home() {
  return (
    <main
      className="flex min-h-screen min-w-screen flex-col items-center justify-center"
      style={gradientStyle}
    >
      <style>{keyframes}</style>
      <Logo />
      <div className="bg-white p-3 mb-5 rounded-md flex-col items-center justify-center">
        <h1 className="text-2xl text-center">
          Eliminate the mess and streamline your data processing pipeline with
          one quick upload{" "}
        </h1>
        <iframe
          src="https://ssse.portal.massive.io/embed?email=&hidename=false&hidemessage=false"
          width="1000"
          height="800"
          className="rounded-md"
          scrolling="no"
          title="Uploader"
        ></iframe>
        <Completion />
      </div>
    </main>
  );
}
