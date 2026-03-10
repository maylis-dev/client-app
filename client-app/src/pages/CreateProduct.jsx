import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import service from "../services/config.services";

function CreateProducts() {
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log("maylis")
    

    // Get seller ID from localStorage
   

    const productData = {
      name,
      salePrice: Number(price),
      description,
      stock: Number(stock),
      image,
    };

 

    try {
      const token = localStorage.getItem("authToken");

      await service.post("/products", productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

     
      // Redirect to products page after creation
      navigate("/about");
    } catch (err) {
      console.error("Error creating product:", err);
      setError("Something went wrong. Please check your inputs and try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="products">
        <div className="blockImage">
          {image && <img src={image} alt="Product Preview" />}
        </div>

        <div className="textDetails">
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="name">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="productinfo">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="price">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="stock">
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div className="image">
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="askrequest">
            <button type="submit" onClick={handleSubmit}>
              Create Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProducts;