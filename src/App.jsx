import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import Navbar from "./component/navbar";
import Signup from "./pages/signup";
import Homepage from "./pages/Homepage";
import { createContext, useState } from "react";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import Posts from "./component/posts";
import Userprofile from "./pages/Userprofile";
export const InfoContext = createContext();
function App() {
  const [correntuser, setCorrentuser] = useState();
  const [allposts, setAllposts] = useState();
  const [userdata, setUserdata] = useState();
  const obj = {
    setCorrentuser,
    correntuser,
    allposts,
    setAllposts,
    userdata,
    setUserdata,
  };
  return (
    <div>
      <InfoContext.Provider value={obj}>
        <BrowserRouter>
          <Routes>
            <Route path="/check" element={<Posts />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/" element={correntuser ? <Navbar /> : <LoginPage />}>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/profile/:id" element={<Userprofile />}></Route>
              <Route exact path="/profile" element={<Profile />}></Route>
              <Route path="/account" element={<Account />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </InfoContext.Provider>
    </div>
  );
}

export default App;
