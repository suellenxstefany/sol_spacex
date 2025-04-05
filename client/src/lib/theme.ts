type Theme = "dark" | "light" | "system";

export function setTheme(theme: Theme) {
  localStorage.setItem("sol-space-theme", theme);
  
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    document.documentElement.classList.toggle("dark", systemTheme === "dark");
  } else {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }
}

export function getTheme(): Theme {
  return (localStorage.getItem("sol-space-theme") as Theme) || "light";
}
