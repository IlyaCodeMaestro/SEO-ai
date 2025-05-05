'use client'
import { useEffect } from "react";
import { useRouter } from "next/router"; // или 'next/navigation' в App Router

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return null;
}
