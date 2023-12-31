import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom';
import Badge  from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../Screens/Cart";
import { useCart } from "./ContextReducer";
export default function Navbar() {

  let data = useCart();

  const [cartView, setCartView] =useState(false);
  const navigate = useNavigate();
const handleLogout =()=>{
   localStorage.removeItem("authToken");
   navigate("/login")
}

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand fs-2 fst-italic bg-body-light" to="/">GoFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/" style={{color:"white"}}>Home</Link>
        </li>
        {/* this will show after login into the page  */}
        {(localStorage.getItem("authToken"))?
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/myOrder" style={{color:"white"}}>My Orders</Link>
        </li>
       :"" }
      </ul>

      {(!localStorage.getItem("authToken"))?
      <div className='d-flex'>
           {/* login page  */}
          <Link className="btn bg-white text-primary mx-3" to="/login">login</Link>
          {/* signup page  */}
          <Link className="btn bg-white text-primary mx-3" to="/Signup">Signup</Link>
      </div>
      :    <div>
        <div className="btn bg-white text-primary mx-2" onClick={()=>{setCartView(true)}}>
        My Cart {"  "}
        <Badge pill-bg="danger">{data.length}</Badge>
        </div>
        {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
      <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
      Logout</div>
      </div>
       }
    </div>
  </div>
</nav>
    
    
    </div>
  )
}
