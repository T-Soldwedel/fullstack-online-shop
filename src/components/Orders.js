import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import "./Orders.css"

export default function Orders() {
  const { user } = useContext(MyContext);
  return (
    <div className="orders-container">
      
      <div >
      <h4>Your Orders:</h4>
        {user &&
          user.orders &&
          user.orders.map((order) => {
            return (
              <div className="single-order-container" key={order._id}>
                 <p>{order._id}</p>
                <div className="single-order">
                  {order.records.map((record) => {
                    return (
                      <div  key={record._id}>
                        <img src={record.img} alt="" />
                        <p>{record.title}</p>
                        <p>{record.price}€</p>
                      </div>
                    );
                  })}
                </div>
                <h5>Total Price for this order: {order.totalPrice}€</h5>
              </div>
            );
          })}
      </div>
    </div>
  );
}
