import Link from "next/link";

export function Navbar() {
  return (
    <nav className="dui-navbar border-b border-gray-300">
      <div className="w-[1000px] mx-auto">
        <Link className="dui-btn dui-btn-ghost" href="/usuarios">
          Usuários
        </Link>
        <Link className="dui-btn dui-btn-ghost" href="/star-wars">
          Star Wars
        </Link>
      </div>
    </nav>
  );
}
