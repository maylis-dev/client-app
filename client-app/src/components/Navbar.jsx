import {
  use,
  useState,
  useRef,
  useEffect,
  useEffectEvent,
  useSyncExternalStore,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"


function Navbar() {
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const [explore, setExplore] = useState(false);
 ;

  const categories = ["Dolls", "Bratz", "Barbie"];
  

  const handleCategoryClick = (category) => {
    setShowCategories(false);
    if (category === "Dolls") {
      navigate("/products");
    } else if (category === "Barbie") {
      navigate("/barbies");
    } else if (category === "Bratz") {
      navigate("/bratzs");
    }
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

          <Link to="/" className="Home">
            home
          </Link>

          <Link to="/about" className="about">
            about
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;