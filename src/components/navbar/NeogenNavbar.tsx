import AppNavBar from "./AppNavBar";
import UserNavBar from "./UserNavBar";

function NeogenNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f1f]/75 backdrop-blur">
      <UserNavBar/>
    </header>
  );
}

export default NeogenNavbar;
