import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const editProfile = () => {
    navigate("/editprofileuser");
  };

  const deleteOrder = (id) => {
    fetch(`/orders/${id}`, {
      method: "DELETE",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUser(result.data);
        }
      });
  };

  const deleteUserAccount = () => {
    fetch(`/users/${user._id}`, {
      method: "DELETE",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json)
      .then((result) => {
        if (result.success) {
          setUser(null);
          localStorage.removeItem("token");
          navigate("/signup");
        }
      });
  };

  return (
    <div className="profile-container">
      <h3>Profile</h3>
      {user && (
        <>
          <div classname="profile-flex-container">

            <div className="profile-user-details">
              <p>{user.fullName}</p>
              <p>{user.email}</p>
              <p>{user.firstName}</p>
              <img src={user.profileImage} width="300" alt="profileImage" />
              <button onClick={editProfile}>Update Profile</button>
          <button onClick={logout}>logout</button>
          <button onClick={deleteUserAccount}>Delete User</button>
            </div>

            <div className="profile-orders">
              <h4>Previous Orders: </h4>

              <ul>
                {user.orders.map((order) => {
                  return (
                    <div key={order._id}>
                      <h3>{order._id}</h3>
                      <h4>$ {order.totalPrice}</h4>
                      <button onClick={() => deleteOrder(order._id)}>
                        delete order
                      </button>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>


        </>
      )}
    </div>
  );
}
