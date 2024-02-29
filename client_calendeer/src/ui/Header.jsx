import Button from "./Button";
import Logo from "./Logo";

function Header({ user }) {
  return (
    <div className="flex items-center justify-between bg-stone-300 px-6 py-3">
      <Logo />
      <div className="flex items-center justify-between gap-2">
        {/* <Button>Day</Button> */}
        {/* <Button>Week</Button> */}
      </div>
      <div className="flex items-center justify-between gap-4">
        <h2>Hello, {user}</h2>
        <Button type="secondary">Log out</Button>
      </div>
    </div>
  );
}

export default Header;
