"use client";
import SimulateTransaction from "@/components/simulatetransaction";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SimulateTransaction />
    </main>
  );
}