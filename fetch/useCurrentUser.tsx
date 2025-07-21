import { useState, useEffect } from "react";
import { localAPI, type User } from "../lib/localStorageAPI";

export const useCurrentUser = () => {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const user = localAPI.getCurrentUserData();
    setData(user);
    setIsLoading(false);
  }, []);

  return { data, isLoading };
};
