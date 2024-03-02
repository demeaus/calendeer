import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Main from "./ui/Main";
import AddEvent from "./components/AddEvent";
import View from "./components/View";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Header />
        <Main>
          <View />
          <AddEvent />
        </Main>
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
