"use client";

import { useState, useEffect } from "react";

import LoginModal from "@/components/modal/LoginModal";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginModal />
    </>
  );
};
