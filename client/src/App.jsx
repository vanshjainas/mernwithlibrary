import Books from "./components/Books/Books";
import ContactUs from "./components/contact us/contact";
import HomePage from "./components/Home/Home";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Signup from "./components/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
       
          {/* home page or route */}
          <Route index element={<HomePage/>} />
          {/* login page or route */}
          <Route path="/login" element={<Login />} />
          {/* signup page or route */}
          <Route path="/books" element={<Books/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<ContactUs />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
