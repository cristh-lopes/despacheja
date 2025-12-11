import { useTheme } from "next-themes";
import Image from "next/image";

export function HorizontalLogo() {
  const { theme } = useTheme();
  return (
    <Image
      src={
        theme == "light"
          ? "logo-horizontal-light.svg"
          : "logo-horizontal-dark.svg"
      }
      alt="Logo Horizontal" 
      fill
    />
  );
}
