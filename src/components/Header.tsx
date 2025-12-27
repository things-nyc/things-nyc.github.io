import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const navLink =
  "text-sm text-slate-900 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 rounded-md px-1 py-0.5";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="font-semibold tracking-tight text-slate-900 flex items-center gap-2"
        >
          <img
            src="images/logo/logo.png"
            alt="The Things New York"
            className="h-20 w-auto"
          />
          <span className="hidden sm:block">The Things New York</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/stories" className={navLink}>
            Stories
          </NavLink>
          <a className={navLink} href="#">
            Projects
          </a>
          <a className={navLink} href="#">
            Blog
          </a>
          <a className={navLink} href="#">
            Get Involved
          </a>
          <NavLink to="/minutes" className={navLink}>
            Minutes
          </NavLink>
          <NavLink to="/people" className={navLink}>
            People
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="px-4 py-4 space-y-2">
            <NavLink
              to="/stories"
              className={`${navLink} block py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Stories
            </NavLink>
            <a
              className={`${navLink} block py-2`}
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a
              className={`${navLink} block py-2`}
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </a>
            <a
              className={`${navLink} block py-2`}
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Involved
            </a>
            <NavLink
              to="/minutes"
              className={`${navLink} block py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Minutes
            </NavLink>
            <NavLink
              to="/people"
              className={`${navLink} block py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              People
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
