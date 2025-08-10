import { Outlet } from "react-router";

export default function LayoutMain() {
  return (
    <div>
      <nav>
        <h1>Flozka</h1>
        <div>
          <img src="/flozka_logo.png" alt="Flozka Logo" />
        </div>
      </nav>

      <Outlet />

      <footer>
        <p>&copy; {new Date().getFullYear()} Flozka. All rights reserved.</p>
      </footer>
    </div>
  );
}
