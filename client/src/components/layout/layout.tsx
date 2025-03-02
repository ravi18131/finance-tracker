import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <section>
      <h1>Layout</h1>
      <Outlet />
    </section>
  );
}
