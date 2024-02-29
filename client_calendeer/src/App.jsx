import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./ui/AppLayout";
import AddEvent from "./components/AddEvent";
import Day from "./components/Day";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  const user = "a@g.com";

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Header user={user} />
        <Day />
        <AddEvent />
        <Footer />
      </AppLayout>
    </QueryClientProvider>
  );
}

export default App;
