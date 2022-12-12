import { NavLink, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Records from "./components/Records";
import { MyContext } from "./context/MyContext";
import EditProfileUser from "./components/EditProfileUser";
import "./App.css";
import AdminPanel from "./components/AdminPanel";
import logo from "./img/logo.svg"
import Home from "./components/Home";

function App() {
  const { cart, user } = useContext(MyContext);

  return (
    <div className="App">
      <ul className="navbar">

        <div>
        <li>
          <NavLink to="/">
          <img src={logo} alt=""></img>
          </NavLink>
        </li>
          
        </div>
        <div className="navlinks">        

        <li className="border-bottom">
          <NavLink to="/records">Products </NavLink>
        </li>
        {user ? (
          <>
            <li className="border-bottom">
              <NavLink to="/profile"> Profile</NavLink>
            </li>
            <li className="border-bottom">
              <NavLink to="/orders">Orders </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="border-bottom">
              <NavLink to="/login">Login </NavLink>
            </li>
            <li className="border-bottom">
              <NavLink to="/signup">Signup </NavLink>
            </li>
          </>
        )}
        {user && user.role === "admin" && (
          <li className="border-bottom">
            <NavLink to="/admin">Admin panel</NavLink>
          </li>
        )}
        <li className="border-bottom">
          <NavLink to="/cart">
            Cart <sup>{cart.length}</sup>{" "}
          </NavLink>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link" href="#3" data-bs-toggle="dropdown">
            <NavLink className="NavLink" to="shows">
              Shows
            </NavLink>
          </a>

          {/* -- Dropdown menu -- */}
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#ladida">
                <NavLink className="NavLink-show" to="shows/ladida">
                  Ladida
                </NavLink>
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#dings">
                <NavLink className="NavLink-show" to="shows/dings">
                  Dings
                </NavLink>
              </a>
            </li>

            <li>
              <a class="dropdown-item" href="#triomio">
                <NavLink className="NavLink-show" to="shows/triomio">
                  TrioMio
                </NavLink>
              </a>
            </li>

          </ul>


          
        </li>
        
        </div>
      </ul>

      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />

        <Route path="/records" element={<Records />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofileuser" element={<EditProfileUser />} />
      </Routes>
    </div>
  );
}

export default App;
