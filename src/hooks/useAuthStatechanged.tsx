import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@services/firebase";

import { useEffect, useState } from "react";

export function useAuthStatechanged() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      }
    );
    return unsubscribeFromAuthStatusChanged;
  }, [user]);

  return {
    user,
  };
}
