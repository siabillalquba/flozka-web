export function Header() {
  return (
    <header className="bg-white py-6">
      <div className="container mx-auto px-4">
        {/* Logo centered at top */}
        <div className="flex justify-center">
          <img
            src="/flozka_logo.png"
            alt="Flozka Logo"
            className="h-24 w-auto"
          />
        </div>

        {/* Navigation links centered below logo */}
        <nav className="flex justify-center">
          <ul className="flex space-x-8 text-emerald-900/90 font-bold">
            <li>
              <a href="/" className="hover:text-black transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-black transition-colors"
              >
                Products
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
