import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Signup.css"

export default function Signup() {
  /*   const formRef = useRef() */

  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();

    /* console.log(formRef.current) //form
console.log(formRef.current.firstName) //input field named firstName
console.log(formRef.current.firstName.value)// value in the field FirstName
console.log(formRef.current.lastName.value)
console.log(formRef.current.email.value)
console.log(formRef.current.password.value)
console.log(formRef.current.image.files[0]) */

    /* let userData= {
  firstName : formRef.current.firstName.value,
  lastName: formRef.current.lastName.value,
  email:formRef.current.email.value,
  password : formRef.current.password.value,
  image:formRef.current.image.files[0]
}
console.log(userData)
let formdata = new FormData()
for(const key of userData){
  formdata.append(key, userData[key])
} */

    const data = new FormData(event.target);
    //send data to backend
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

    /*    console.log("form Submitted ! ")
    const data = new FormData(event.target)
    console.log(data) */
    /* for(const pair of data){
      console.log(pair)
    } */
  };

  return (
    <div className="signup-container">
      <h5>Signup</h5>
      <form onSubmit={registerUser} /* ref={formRef} */>
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
      {/* Can put it anywhere in the return */}
    </div>
  );
}
