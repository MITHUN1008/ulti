"use client";

import { useNetworkStatusStore } from "@/store/NetworkStatusStore";

import { useEffect, useState } from "react";

export default function NetworkStatus() {
  const { isOnline, setIsOnline } = useNetworkStatusStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Set initial online status
    setIsOnline(navigator.onLine);

    // Define the event listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Add event listeners for 'online' and 'offline' events
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {!isOnline && (
        <div className="flex justify-center items-center relative">
          <div
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-2xl
           shadow-lg dark:text-gray-400 dark:bg-gray-900 transition-transform absolute top-5"
          >
            <div className="ml-3 text-sm font-normal">
              {isOnline ? "You are Online" : "You are Offline"}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
