import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import Logo from "./Logo";

function Header() {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between bg-stone-300 px-3 py-1 md:px-6 md:py-3">
      <Logo />
      <div className="my-2 flex items-center justify-between gap-2 md:gap-12">
        <div className="flex items-center justify-between gap-2">
          <Button>All Events</Button>
          <Button>24-hour</Button>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm md:text-base">
          <h2 className="hidden md:inline">Hello, {user.email}</h2>
          <Button type="secondary">Log out</Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
