"use client";

import { Conference } from "@/components/conference";
import Navbar from "@/components/navbar";
import Scheduler from "@/components/scheduler";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Scheduler />
      <Conference />
    </main>
  );
}
