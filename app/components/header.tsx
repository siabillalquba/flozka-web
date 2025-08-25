import { Link } from "react-router";

const navigationLinks = [
  { to: "/", text: "Home" },
  { to: "/products", text: "Products" },
  { to: "/register", text: "Register" },
  { to: "/login", text: "Login" },
  { to: "/dashboard", text: "Dashboard" },
];

export function Header() {
  return (
    <header className="bg-white py-6">
      <div className="container mx-auto px-4">
        <Link to="/">
          <div className="flex justify-center">
            <img
              src="/flozka_logo.png"
              alt="Flozka Logo"
              className="h-24 w-auto"
            />
          </div>
        </Link>

        {/* Navigation links centered below logo */}
        <nav className="flex items-center justify-evenly">
          <ul className="flex text-emerald-900/90 font-semibold ">
            {navigationLinks.map((navigationLink) => (
              <li key={navigationLink.to}>
                <Link
                  to={navigationLink.to}
                  className="px-3 py-1 rounded-full hover:text-black transition-colors"
                >
                  {navigationLink.text}
                </Link>
                {/* <a href="/" className="hover:text-black transition-colors">
                Home
              </a> */}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
