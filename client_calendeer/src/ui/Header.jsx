import Button from "./Button";
import Logo from "./Logo";

function Header() {
  return (
    <div className="flex items-center justify-between bg-stone-300 px-4 py-2">
      <Logo />
      <div className="flex items-center justify-between gap-2">
        <Button>Day</Button>
        <Button>Week</Button>
      </div>
    </div>
  );
}

export default Header;
