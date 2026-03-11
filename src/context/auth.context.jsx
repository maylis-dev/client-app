import { createContext, useState } from "react";
import { useContext, useEffect } from "react";
import service from "../services/config.services";
const AuthContext = createContext();
// to crete context to track if th user is still on

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // change later

  const [loggedUserId, setLoggedUserId] = useState(null); //verifie le user

  const [isAuthenticatingUser, setIsAuthenticatingUser] = useState(true);


  const [loggedUserRole, setLoggedUserRole] = useState(null)// for the role


  const passedContext = {
    isLoggedIn,
    setIsLoggedIn,
    loggedUserId,
    setLoggedUserId,//add user role
    loggedUserRole, //add user
      setLoggedUserRole
  };

  useEffect(() => {
    // check the token validation when the page loads for the first time
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    // const token = localStorage.getItem("authToken")

    try {
      // const response = await service.get(`/auth/verify`, {
      //   headers: {
      //     authorization: `Bearer ${token}`
      //   }
      // })
      const response = await service.get(`/auth/verify`); // already includes the token, as per the service
      console.log(response);

      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      
      setLoggedUserRole(response.data.payload.role); // only for role
      setIsAuthenticatingUser(false);

    } catch (error) {
      console.log(error);

      // we assume that if the verify call failed, the token was invalid or non existing
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsAuthenticatingUser(false);

      setLoggedUserRole(null);
    }
  };

  // main loading screen for the whole app
  if (isAuthenticatingUser) {
    return <h3>Authenticating...</h3>;
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
