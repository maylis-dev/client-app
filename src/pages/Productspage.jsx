import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dollspage.css";

function Productspage() {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default: show all
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [selectedCategory]); // ✅ on peut relancer la récupération si on veut filtrer côté backend

  const getData = async () => {
    try {
      // Si tu veux filtrer côté backend
      const query = selectedCategory !== "All" ? `?category=${selectedCategory}` : "";
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/products${query}`
      );
      console.log("All products fetched:", response.data); // 🔍 debug
      setAllProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrage côté frontend (optionnel, si backend ne filtre pas)
  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <Navbar />

      <div className="containerDolls">
        <div className="blockDolls">
          <div className="titre">
            <h1>All Dolls</h1>

            {/* Filter buttons */}
            <div className="filter-buttons">
              {["All", "Barbie", "Bratz"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? "active" : ""}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="listeDolls">
            {filteredProducts.length === 0 ? (
              <p>No products found for this category.</p>
            ) : (
              filteredProducts.map((product) => (
                <div className="purchaseDolls" key={product._id}>
                  <h3>{product.name}</h3>
                  <p>Category: {product.category || "N/A"}</p>
                  <Link to={`/products/${product._id}`}>
                    <button>Request</button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Productspage;
