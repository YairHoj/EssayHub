import "./App.css";
import EssayManager from "./Components/EssayManager";
import Menu from "./Components/Menu";
import Nav from "./Components/Nav";
import Heading from "./Components/Heading";
import Features from "./Components/Features";
import CollegeList from "./Components/CollegeList";
import MyColleges from "./Components/MyColleges";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Looking from "./Components/Looking";
import Footer from "./Components/Footer";
import Menu2 from "./Components/Menu2";
import Nav2 from "./Components/Nav2";
import SignIn from "./Components/SignIn";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Menu page="page" display1="block" />
                <div id="page">
                  <Nav page="page" />
                  <Heading />
                  <Features />
                  <Looking />
                  <Footer />
                </div>
              </>
            }
          />
          <Route
            path="/browse"
            element={
              <>
                <Menu page="page2" display1="flex" />
                <Nav page="page2" />
                <CollegeList />
              </>
            }
          />
          <Route
            path="/essaymanager"
            element={
              <>
                <Menu page="page3" display1="flex" />
                <Nav page="page3" />
                <EssayManager />
              </>
            }
          />
          <Route
            path="/my-colleges"
            element={
              <>
                <MyColleges />
              </>
            }
          />
          <Route
            path="/signIn"
            element={
              <>
                <SignIn />
              </>
            }
          />
        </Routes>
        <NotificationContainer />
      </Router>
    </div>
  );
}

export default App;
