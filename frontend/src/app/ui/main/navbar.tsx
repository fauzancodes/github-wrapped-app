"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";

const Navbar = () => {
  const currentRoute = usePathname();
  
  return (
    <nav className="navbar glass shadow-md fixed top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link href="/" className={`font-medium text-base ${currentRoute === "/" && "!font-bold"}`}>Home</Link></li>
            <li><Link href="/analyze" className={`font-medium text-base ${currentRoute === "/analyze" && "!font-bold"}`}>Analyze</Link></li>
          </ul>
        </div>
        <a className="btn btn-link text-xl font-bold">Github Wrapped App</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
            <li><Link href="/" className={`font-medium text-base ${currentRoute === "/" && "!font-bold"}`}>Home</Link></li>
            <li><Link href="/analyze" className={`font-medium text-base ${currentRoute === "/analyze" && "!font-bold"}`}>Analyze</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="https://github.com/fauzancodes/github-wrapped-app" target="_blank" className="btn text-base font-semibold">Source Code</Link>
      </div>
    </nav>
  )
}

export default Navbar