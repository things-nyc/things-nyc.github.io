import { NavLink, Link } from "react-router-dom";

const navLink =
  "text-sm text-slate-900 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 rounded-md px-1 py-0.5";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        {/* <a href="/" className="font-semibold tracking-tight text-slate-900">
          The Things New York
        </a> */}

        <Link
          to="/"
          className="font-semibold tracking-tight text-slate-900 flex items-center gap-2"
        >
          <img
            src="images/logo/logo.png"
            alt="The Things New York"
            className="h-20 w-auto"
          />
          The Things New York
        </Link>

        <nav className="flex items-center gap-4">
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
          <a className={navLink} href="#">
            People
          </a>
        </nav>
      </div>
    </header>
  );
}
