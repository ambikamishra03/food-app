import './App.css';
import Home from './Screens/Home';

import{
  BrowserRouter as Router,
  Routes,
  Route
}from "react-router-dom";
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from "./components/ContextReducer";
import MyOrder from './Screens/Myorder';

function App() {
  return (
    <CartProvider>
    <Router>
  <div>
   <Routes>
<Route  exact path="/" element={<Home/>} />
<Route  exact path="/Login" element={<Login/>} />
<Route  exact path="/Signup" element={<Signup/>} />
<Route  exact path="/myOrder" element={<MyOrder/>} />

   </Routes>
  </div>
    </Router>
    </CartProvider>
  );
}

export default App;
