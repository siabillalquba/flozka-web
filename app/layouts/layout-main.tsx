import { Outlet } from "react-router";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";

export default function LayoutMain() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
