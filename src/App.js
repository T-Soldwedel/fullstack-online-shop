import { NavLink, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import HomePage from "./components/HomePage";
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

function App() {
  const { cart, user } = useContext(MyContext);

  return (
    <div className="App">
      <ul className="navbar">
        <li>
          <NavLink to="/">Home </NavLink>
        </li>
        <li>
          <NavLink to="/records">Records </NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink to="/orders">Orders </NavLink>
            </li>
            <li>
              <NavLink to="/profile"> Profile</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login </NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup </NavLink>
            </li>
          </>
        )}
        {user && user.role === "admin" && (
          <li>
            <NavLink to="/admin">Admin panel</NavLink>
          </li>
        )}
        <li>
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



      </ul>

      <Routes>
        {/* Client Side Routing */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<HomePage />} />
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
