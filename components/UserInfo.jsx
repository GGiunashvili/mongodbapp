"use client";

import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const [session, setSession] = useState(null); // Initializing session state as null
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setSession(data);
    };
    fetchSession();
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="flex">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        {session ? (
          <>
            <div>
              Name: <span className="font-bold">{session.user?.name}</span>
            </div>
            <div>
              Email: <span className="font-bold">{session.user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
            >
              Log Out
            </button>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
