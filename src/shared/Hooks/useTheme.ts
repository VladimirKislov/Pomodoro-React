import { useEffect, useState } from "react";
export const useTheme = () => {
  let resTheme: any;
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return (resTheme = localStorage.getItem("app-theme") || "light");
    }
    return resTheme;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
