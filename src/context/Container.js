import React, { useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import { useNavigate } from "react-router-dom";


// Font Awesome 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faPinterest, faInstagram } from "@fortawesome/free-brands-svg-icons"

const iconMinus = <FontAwesomeIcon icon={faSquareMinus} />;
const iconPlus = <FontAwesomeIcon icon={faSquarePlus} />;

const iconFacebook = <FontAwesomeIcon icon={faFacebook} />
const iconTwitter = <FontAwesomeIcon icon={faTwitter} />
const iconInstagram = <FontAwesomeIcon icon={faInstagram} />
const iconPinterest = <FontAwesomeIcon icon={faPinterest} />


//

export default function Container(props) {
  const [records, setRecords] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/records")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRecords(result);
      });

    const token = localStorage.getItem("token");
    if (token) {
      fetch("/users/checkusertoken", {
        method: "GET",
        headers: { token: token },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setUser(result.data);
          } else {
            navigate("/login");
          }
        });
    }
  }, []);

  return (
    <MyContext.Provider
      value={{ records, setRecords, cart, setCart, user, setUser, iconMinus, iconPlus, iconFacebook, iconTwitter, iconInstagram, iconPinterest }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
