import Link from "next/link"


const Footer = () => {
  return (
    <footer className="footer md:footer-center bg-base-300 text-base-100 font-medium p-4">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - Made by <Link href="https://fauzancodes.id" target="_blank">fauzancodes</Link>.</p>
      </aside>
    </footer>
  )
}

export default Footer