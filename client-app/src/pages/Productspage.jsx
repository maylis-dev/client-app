import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dollspage.css";

function Productspage() {
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/products`,
      );
      console.log(response);
      setAllProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (allProducts === null) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <Navbar />

      <div className="containerDolls">
        <div className="blockDolls">
          <div className="titre">
            <h1>All Dolls</h1>
          </div>
          <div className="listeDolls">
            {allProducts.map((product) => (
              
              <div className="purchaseDolls" key={product._id}>
                <h3>{product.name}</h3>

                <Link to={`/products/${product._id}`}>
                  <button>Request</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Productspage;
