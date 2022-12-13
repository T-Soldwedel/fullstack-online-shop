import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import "./Cart.css"




export default function Cart() {


  const { cart, setCart, user, setUser, iconMinus, iconPlus } = useContext(MyContext);
  const navigate = useNavigate();
  const decrementQuantity = (id) => {
    const foundRecord = cart.find((item) => item._id === id);
    if (foundRecord.quantity === 1) {
      setCart(cart.filter((item) => item._id !== id));
    } else {
      foundRecord.quantity--;
      setCart([...cart]);
    }
  };

  const incrementQuantity = (id) => {
    const foundRecord = cart.find((item) => item._id === id);
    foundRecord.quantity++;
    setCart([...cart]);
  };

  const placeOrder = () => {
    if (!user) {
      navigate("/login");
    } else {
      fetch("/orders", {
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: cart.map((record) => record._id),
          totalPrice: cart.reduce(
            (acc, item) => (acc += item.price * item.quantity),
            0
          ),
          userId: user._id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            console.log(result);
            setUser(result.data);
            setCart([]);
          }
        });
    }
  };

  return (
    <div className="cart-container">
      <h5>Cart</h5>
      <div classname="cart-single-order">
        {cart.map((record) => {
          return (
            <div key={record._id}>
              <img src={record.img}  alt="recordimage" />
              <p>{record.title}</p>
              <p>
                {" "}
                Quantity:{" "}
                <span onClick={() => decrementQuantity(record._id)}>
                  {" "}
                  {iconMinus}{" "}
                </span>{" "}
                {record.quantity}{" "}
                <span onClick={() => incrementQuantity(record._id)}>
                  {" "}
                  {iconPlus}{" "}
                </span>
              </p>
              <h5>${record.price}</h5>
            </div>
          );
        })}
      </div>

      <h5>
        Total:{" "}
        {cart.reduce((acc, item) => (acc += item.price * item.quantity), 0)}
      </h5>
      <button className="cart-place-order" onClick={placeOrder}>Place Order</button>
    </div>
  );
}
