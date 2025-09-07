import { Link } from "react-router";

const navigationLinks = [
  { to: "/", text: "Home" },
  { to: "/products", text: "Products" },
  { to: "/register", text: "Register" },
  { to: "/login", text: "Login" },
  { to: "/dashboard", text: "Dashboard" },
];

// export async function loader({ request }: Route.ClientLoaderArgs) {
//   const session = await getSession(request.headers.get("Cookie"));
//   const token = session.get("token");
//   const response = await fetch(
//     `${import.meta.env.VITE_BACKEND_API_URL}/auth/me`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   const user: UserAuthMe = await response.json();
//   return { user };
// }

export function Header() {
  // export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  //   const { user } = loaderData;

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
            {/* {user.fullName && (
            <li>
              <div>
                <p>{user.fullName}</p>
              </div>
            </li>
          )} */}
          </ul>
        </nav>
      </div>
    </header>
  );
} // import { Link } from "react-router";
