import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative hover:bg-muted dark:hover:bg-card text-card-foreground"
    >
      <Sun className="size-5 text-muted-foreground rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <Moon className="absolute size-5 text-muted-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}


