import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Signup from "./components/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* home page or route */}
        <Route index element={<Home />} />
        {/* login page or route */}
        <Route path="/login" element={<Login />} />
        {/* signup page or route */}
        <Route path="/signup" element={<Signup />} />
        {/* profile page or route */}
        <Route path="/my-profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
