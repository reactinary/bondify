import { Button } from "@/components/ui/button";
import { toggleTheme } from "@/lib/theme";
import { Moon, Sun } from "lucide-react";

export const ThemeSwitcher = ({ theme }: { theme: "light" | "dark" }) => (
  <Button variant="ghost" onClick={() => toggleTheme()} size="icon">
    {theme === "light" ? <Sun /> : <Moon />}
  </Button>
);
