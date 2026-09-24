import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";

// Simple top navigation bar. No branding or logo, just text links.
const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium ${
    isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
  }`;

export default function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <Logo />
        <NavLink to="/" className="text-base font-semibold text-gray-900">
          PrismStack
        </NavLink>
        <nav className="flex items-center gap-6">
          <NavLink to="/" end className={linkClasses}>
            Tools
          </NavLink>
          <NavLink to="/categories" className={linkClasses}>
            Categories
          </NavLink>
          <NavLink to="/submit" className={linkClasses}>
            Submit
          </NavLink>
          <NavLink to="/admin" className={linkClasses}>
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
