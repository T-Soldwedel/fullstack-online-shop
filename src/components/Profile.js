import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const iconTrash = <FontAwesomeIcon icon={faTrash} />;


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
      {user && (
        <>
          <div className="profile-user-details">
            <p>{user.fullName}</p>
            <p>{user.email}</p>
            <div>
              <img src={user.profileImage} width="200" alt="profileImage" />
            </div>

            <button onClick={editProfile}>Update Profile</button>
            <button onClick={logout}>Logout</button>
            <button onClick={deleteUserAccount}>Delete User </button>
          </div>

          <div className="previous-orders">
            <h4>Orders: </h4>

            <ul>
              {user.orders.map((order) => {
                return (
                  <div key={order._id}>
                    <h5>{order._id}</h5>

                    <div className="deleteButton">
                      <p>$ {order.totalPrice}</p>
                      <button onClick={() => deleteOrder(order._id)}>
                        {iconTrash}
                      </button>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
