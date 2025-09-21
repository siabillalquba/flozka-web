import { Link, Outlet } from "react-router";
import type { Route } from "./+types/layout-main";
import { getSession } from "~/sessions";
import type { UserAuthMe } from "~/modules/user/type";

const navigationLinksDefault = [
  { to: "/", text: "Home" },
  { to: "/products", text: "Products" },
  { to: "/register", text: "Register" },
  { to: "/login", text: "Login" },
  { to: "/cart", text: "Cart" },
  { to: "/dashboard", text: "Dashboard" },
];

const navigationLinksAuth = [
  { to: "/", text: "Home" },
  { to: "/products", text: "Products" },
  { to: "/logout", text: "Logout" },
  { to: "/cart", text: "Cart" },
  { to: "/dashboard", text: "Dashboard" },
];

export async function loader({ request }: Route.ClientLoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/me`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const user: UserAuthMe = await response.json();
  const isAuthenticated = token ? true : false;
  const navigationLinks = isAuthenticated
    ? navigationLinksAuth
    : navigationLinksDefault;
  return { user, navigationLinks };
}

export default function LayoutMain({ loaderData }: Route.ComponentProps) {
  const { user, navigationLinks } = loaderData;

  return (
    <div className="flex min-h-screen flex-col">
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
              {user.fullName && (
                <li>
                  <div>
                    <p className="text-black">{user.fullName}</p>
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-[1]">
        <Outlet />
      </main>

      <footer>
        <div className="flex justify-center m-5">
          <p>&copy; {new Date().getFullYear()} Flozka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// import { Footer } from "~/components/footer";
// import { Header } from "~/components/header";

// export default function LayoutMain() {
//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />

//       <main className="flex-[1]">
//         <Outlet />
//       </main>

//       <Footer />
//     </div>
//   );
// }
