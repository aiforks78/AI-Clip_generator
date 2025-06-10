"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <Button onClick={() => signIn("github")}>Sign in with GitHub</Button>
      )}
    </main>
  );
}
