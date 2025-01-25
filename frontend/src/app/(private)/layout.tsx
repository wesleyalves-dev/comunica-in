import { ReactNode } from "react";

import { Navbar } from "@/components/layout";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="w-[1000px] mx-auto pt-6">{children}</div>
    </div>
  );
}
