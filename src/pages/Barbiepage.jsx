import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dollspage.css";

function Barbiepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBarbieProducts = async () => {
      try {
        // Fetch all products
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/products`
        );

        // Filter only Barbie products
        const barbieProducts = response.data.filter(
          (product) => product.category === "Barbie"
        );
        setProducts(barbieProducts);

        console.log("Barbie products fetched:", barbieProducts); // debug
      } catch (error) {
        console.error("Failed to fetch Barbie products:", error);
      } finally {
        setLoading(false);
      }
    };

    getBarbieProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="containerDolls">
        <div className="blockDolls">
          <div className="titre">
            <h1>Barbie Dolls</h1>
          </div>

          {loading ? (
            <h3>Loading...</h3>
          ) : products.length === 0 ? (
            <p>No Barbie products found.</p>
          ) : (
            <div className="listeDolls">
              {products.map((product) => (
                <div className="purchaseDolls" key={product._id}>
                  <h3>{product.name}</h3>
                  <p>Category: {product.category || "N/A"}</p>
                  <Link to={`/products/${product._id}`}>
                    <button>Request</button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Barbiepage;