import Footer from "./components/Footer";
import Header from "./components/Header";
import GrandmastersList from "./pages/GrandmastersList";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <GrandmastersList />
      <Footer />
    </div>
  );
};

export default App;
