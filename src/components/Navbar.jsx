import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setLoggedUserId } = useContext(AuthContext);

  const categories = ["Dolls", "Bratz", "Barbie"];

  const handleCategoryClick = (category) => {
    setShowCategories(false);

    if (category === "Dolls") navigate("/products");
    if (category === "Barbie") navigate("/barbies");
    if (category === "Bratz") navigate("/bratzs");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setLoggedUserId(null);
    navigate("/");
  };

  return (
    <div className="navigation">
      <div className="container">
        <div className="buttons">

          <div className="find">
            <div onClick={() => setShowCategories(!showCategories)}>
              Find your dolls
            </div>

            {showCategories && (
              <div className="dolls-menu">
                {categories.map((cat) => (
                  <div key={cat} onClick={() => handleCategoryClick(cat)}>
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/">home</Link>
          { isLoggedIn ? (
            <>
              
               <Link to="/about">about</Link>
                <button onClick={handleLogout}>logout</button>
            </>
          ) : (
            <>
            <Link to="/login">login</Link>
          <Link to="/signup">signup</Link>
            </>
          )}
      
         

         

        </div>
      </div>
    </div>
  );
}

export default Navbar;