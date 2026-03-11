import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dollspage.css";

function Bratzpage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBratzProducts = async () => {
      try {
        // Fetch all products
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/products`
        );

        // Filter only Bratz products
        const bratzProducts = response.data.filter(
          (product) => product.category === "Bratz"
        );
        setProducts(bratzProducts);

        console.log("Bratz products fetched:", bratzProducts); // debug
      } catch (error) {
        console.error("Failed to fetch Bratz products:", error);
      } finally {
        setLoading(false);
      }
    };

    getBratzProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="containerDolls">
        <div className="blockDolls">
          <div className="titre">
            <h1>Bratz Dolls</h1>
          </div>

          {loading ? (
            <h3>Loading...</h3>
          ) : products.length === 0 ? (
            <p>No Bratz products found.</p>
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

export default Bratzpage;