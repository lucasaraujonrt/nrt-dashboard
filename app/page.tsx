"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      window.location.href = "/dashboard";
    }
  }, [isSignedIn]);

  return <SignIn />;
}
