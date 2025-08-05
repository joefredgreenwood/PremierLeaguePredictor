"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <div className="text-white font-medium py-2 px-4 text-2xl">
      <button
        className="mx-2 bg-slate-600 hover:bg-slate-400 rounded-md transition py-2 px-4 cursor-grab"
        onClick={() => (session ? signOut() : signIn())}
        title={session?.user?.email ?? "Please sign In"}
      >
        {session ? "Sign out" : "Sign In"}
      </button>
    </div>
  );
}
