import { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Loginpage() {
  const { setIsLoggedIn, setLoggedUserId, setLoggedUserRole } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contact backend to validate user credentials
    const body = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        body,
      );
      console.log(response); // HOULD MATCH THE ROUTE IF ITS A POST IN THE BACK YOU POST POST
      

      // storing the  token sadely in local storage to be use when the user refresh or comeback later
      localStorage.setItem("authToken", response.data.authToken);

      //upadete the context state

      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setLoggedUserRole(response.data.payload.role);

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
      } else {
        //navigate to error page
      }
    }
  };

  return (
    <div>
      <h1>Login Form</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Loginpage;
