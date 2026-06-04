import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

import { onAuthStateChanged, User } from "firebase/auth";
import { syncLocalToCloud } from "@/services/sync.service";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        await syncLocalToCloud(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
