import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Signup.css"

export default function Signup() {


  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();


    const data = new FormData(event.target);

    fetch("/users", { method: "POST", body: data })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success("Successfully Signed Up!");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error(JSON.stringify(result.message));
        }
      });

  };

  return (
    <div className="signup-container">
      <h5>Signup</h5>
      <form onSubmit={registerUser}>
        <label>
          <input type="text" name="firstName" placeholder="First Name"  required />{" "}
        </label>
        <br />

        <label>
          <input type="text" name="lastName" placeholder="Last Name" required />{" "}
        </label>
        <br />

        <label>
          <input type="email" name="email" placeholder="Email"required />{" "}
        </label>
        <br />

        <label>
          <input type="password" name="password" placeholder="Password" required />{" "}
        </label>
        <br />

        <label>
          <input type="file" name="image" />{" "}
        </label>
        <br />

        <button>Signup User</button>
      </form>
      <Toaster position="top-center" />{" "}
    </div>
  );
}
