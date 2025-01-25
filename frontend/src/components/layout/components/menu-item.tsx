"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  href: string;
  label: string;
}

export function MenuItem({ href, label }: MenuItemProps) {
  const pathname = usePathname();

  function isSelected() {
    return pathname.startsWith(href);
  }

  return (
    <Link
      className={`dui-btn dui-btn-ghost${isSelected() ? ` bg-gray-300` : ""}`}
      href={href}
    >
      {label}
    </Link>
  );
}
