"use client";
import React, { useState } from "react";
import Completion from "./components/completion";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-gradient-defang">
      <Completion />
      <iframe
        src="https://ssse.portal.massive.io/embed?email=&hidename=false&hidemessage=false"
        width="375"
        height="800"
        className="my-5"
        scrolling="no"
        title="Uploader"
      ></iframe>
    </main>
  );
}
