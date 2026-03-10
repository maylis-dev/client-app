import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import service from "../services/config.services";

function EditProductsPage() {
  const navigate = useNavigate();
  const { id: productId } = useParams(); // Get product ID from URL

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await service.get(`/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setName(res.data.name);
        setDescription(res.data.description || "");
        setPrice(res.data.salePrice);
        setStock(res.data.stock);
        setImage(res.data.image || "");
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les données du produit.");
      }
    };

    fetchProduct(); //
  }, [productId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      salePrice: Number(price),
      description,
      stock: Number(stock),
      image,
    };

    try {
      const token = localStorage.getItem("authToken");
      await service.put(`/products/${productId}`, productData, {
        // contient information produit
        headers: { Authorization: `Bearer ${token}` },
      });

      // Redirect to About page after update
      navigate("/about");
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      setError("Une erreur est survenue. Vérifiez vos champs et réessayez.");
    }
  };

  //dte
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await service.delete(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

    
      navigate("/about"); // Redirect after deletion
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete the product. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-product-page">
        <h2>Edit Product</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="edit-product-form">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <button type="submit">Update Product</button>
          {/* Delete Button */}
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProductsPage;
