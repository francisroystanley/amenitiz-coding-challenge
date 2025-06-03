import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Footer, Header } from "./components";
import GrandmastersList from "./pages/GrandmastersList";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <Switch>
          <Route path="/profile/:username">
            <ProfilePage />
          </Route>
          <Route path="/">
            <GrandmastersList />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
