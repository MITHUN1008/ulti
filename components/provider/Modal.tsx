"use client";

import { useState, useEffect } from "react";

import LoginModal from "../modal/LoginModal";
import PlansModal from "../modal/PlansModal";

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
      <PlansModal />
    </>
  );
};
