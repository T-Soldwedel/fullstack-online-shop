import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import "./Records.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faStar } from "@fortawesome/free-solid-svg-icons";

const iconCart = <FontAwesomeIcon icon={faCartPlus} />;
const iconStarBlack = <FontAwesomeIcon icon={faStar} />;

export default function Records() {
  const { records, setCart, cart, user } = useContext(MyContext);
  const addItemIntoCart = (record) => {
    const foundItem = cart.find((item) => item._id === record._id);
    if (foundItem) {
      foundItem.quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...record, quantity: 1 }]);
    }
  };

  return (
    <div>
      <div className="products">
        {records.map((record) => {
          return (
            <div key={record._id} className="flex-container">
              <div className="single-product">
                <img src={record.img} alt="" />
                <p>{record.title}</p>
                <p>{record.author}</p>
                <p>$ {record.price}</p>
                <div className="stars">
                  <span>{iconStarBlack}</span>
                  <span>{iconStarBlack}</span>
                  <span>{iconStarBlack}</span>
                  <span>{iconStarBlack}</span>
                  <span style={{ color: "white" }}>{iconStarBlack}</span>
                </div>
              </div>
              <div>
                <button className="cartButton" onClick={() => addItemIntoCart(record)}>
                  Add To Cart {""}
                  <span>{iconCart}</span>
                </button>
                {user && user.role === "admin" && <button>delete</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
