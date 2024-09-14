"use client";
import React, { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-gradient-defang">
      <iframe
        src="https://htn.portal.massive.io/embed?email=&hidename=false&hidemessage=false"
        width="375"
        height="800"
        className="my-5"
        scrolling="no"
        title="Uploader"
      ></iframe>
    </main>
  );
}
