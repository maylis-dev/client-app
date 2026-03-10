import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CommentsSection from "../components/Createcomments"; // your comments component
import "./ProductDetail.css";

function ProductDetailpage() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/products/${params.productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [params.productId]);

  if (!product) return <h3>Loading...</h3>;

  return (
    <>
      <Navbar />
      <div className="products">
        <div className="blockImage">
          <div>
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="textDetails">
          <div className="name">
            <h1>{product.name}</h1>
          </div>

          <div className="productinfo">
            <p>Seller: {product.seller}</p>
            <p>Stock: {product.stock}</p>
            <p>Info: {product.info || "N/A"}</p>
            <p>State: {product.state || "N/A"}</p>
          </div>

          <div className="price">
            <p>Price: {product.salePrice}</p>
          </div>

          <div className="askrequest">
            <button>Request</button>
          </div>

          {/* COMMENTS COMPONENT */}
          <CommentsSection productId={params.productId} />
        </div>
      </div>
    </>
  );
}

export default ProductDetailpage;