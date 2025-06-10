"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full px-4 py-3 border-b flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        🎬 AI Clip Generator
      </Link>

      <div className="flex gap-4 items-center">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session?.user ? (
          <>
            <span className="text-sm">Welcome, {session.user.name}!</span>
            <Link href="/upload" className="underline">
              Upload
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Sign In with GitHub
          </button>
        )}
      </div>
    </nav>
  );
}
