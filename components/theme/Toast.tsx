"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

const Toast = () => {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";

  return <Toaster theme={currentTheme} position="top-right" />;
};

export default Toast;
