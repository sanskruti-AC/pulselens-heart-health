import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "PulsePoint | Health Data Lab",
  description: "An educational machine-learning case study exploring a heart-health dataset."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
