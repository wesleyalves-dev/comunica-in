import { MenuItem } from "./components";

export function Navbar() {
  return (
    <nav className="dui-navbar border-b border-gray-300">
      <div className="w-[1000px] mx-auto flex gap-2">
        <MenuItem href="/usuarios" label="Usuários" />
        <MenuItem href="/star-wars" label="Star Wars" />
      </div>
    </nav>
  );
}
