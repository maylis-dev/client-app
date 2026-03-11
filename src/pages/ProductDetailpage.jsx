import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import CommentsSection from "../components/Createcomments"; // Comments component
import "./ProductDetail.css";

function ProductDetailpage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
//verifie si user is logged
  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/products/${productId}`
        );
        setProduct(response.data);
        console.log("maylis")
     console.log("Product fetched from backend:", response.data); // ✅
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [productId]);

  if (loading) return <h3>Loading...</h3>;
  if (!product) return <h3>Product not found.</h3>;
  console.log(product);

  return (
    <>
      <Navbar />

      <div className="products">
        <div className="blockImage">
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name} />
          )}
        </div>

        <div className="textDetails">
          <div className="name">
            <h1>{product.name}</h1>
          </div>

          <div className="productinfo">
            <p>Seller: {product.seller?.username || "N/A"}</p>
                    
            <p>Stock: {product.stock}</p>
            <p>Category: {product.category || "N/A"}</p>
         
          </div>

          <div className="price">
            <p>Price: ${product.salePrice}</p>
          </div>

          <div className="askrequest">
           <p>Email: {product.seller?.email || "N/A"}</p>
          </div>

          {/* COMMENTS COMPONENT */}
          {isLoggedIn && <CommentsSection productId={productId} />}
        </div>
      </div>
    </>
  );
}

export default ProductDetailpage;