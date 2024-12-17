
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Sponsors from './components/Sponsors';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import LoginEndUser from './pages/LoginEndUser';
import SignupEndUser from './pages/SignupEndUser';
import Dashboars from './pages/Dashboard';
import "./index.css";

const ConditionalNavBar = () => {
  const location = useLocation();
  const hideNavBarRoutes = ['/login', '/signup', "/Dashboard"];
  
  return !hideNavBarRoutes.includes(location.pathname) ? <NavBar /> : null;
};
function App() {
  

  return (
    <Router>
      <ConditionalNavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginEndUser />} />
        <Route path="/signup" element={<SignupEndUser />} />
        <Route path="/dashboard" element={<Dashboars />} />
      </Routes>

      <Sponsors />
      <Footer />
    </Router>
  );
}

export default App;




