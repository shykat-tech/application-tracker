"use client";

import { loginWithGoogle, logout } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="p-10">
      {user ? (
        <>
          {user.photoURL && (
            <Image
              src={user.photoURL}
              alt={user.displayName || "User"}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          <h1>{user.displayName}</h1>

          <p>{user.email}</p>

          <button
            onClick={logout}
            className="mt-4 rounded bg-black px-4 py-2 text-white"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1>Not Logged In</h1>

          <button
            onClick={handleGoogleLogin}
            className="rounded bg-black px-4 py-2 text-white"
          >
            Login With Google
          </button>
        </>
      )}
    </main>
  );
}
