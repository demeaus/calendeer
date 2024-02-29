import AddEvent from "../components/AddEvent";
import Day from "../components/Day";
import Footer from "./Footer";
import Header from "./Header";

function AppLayout() {
  const user = "a@g.com";

  return (
    <div className="min-h-screen bg-stone-200">
      <Header user={user} />
      <Day />
      <AddEvent />
      <Footer />
    </div>
  );
}

export default AppLayout;
