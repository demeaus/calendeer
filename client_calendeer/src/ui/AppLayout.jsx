import AddEvent from "../components/AddEvent";
import Day from "../components/Day";
import Footer from "./Footer";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="min-h-screen bg-stone-200">
      <Header />
      <Day />
      <AddEvent />
      <Footer />
    </div>
  );
}

export default AppLayout;
