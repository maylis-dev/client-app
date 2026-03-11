import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import service from "../services/config.services";

function EditProductsPage() {
  const navigate = useNavigate();
  const { id: productId } = useParams(); // Get product ID from URL

  // State pour gérer le formulaire
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  // State pour gérer l'ouverture de l'éditeur
  const [isEditing, setIsEditing] = useState(false);

  // Récupérer le produit au montage
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await service.get(`/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Mettre à jour les champs uniquement si le produit existe
        if (res.data) {
          setName(res.data.name || "");
          setCategory(res.data.category || "");
          setPrice(res.data.salePrice || "");
          setStock(res.data.stock || "");
          setImage(res.data.image || "");
        }

        // Activer l'édition après récupération
        setIsEditing(true);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les données du produit.");
      }
    };

    fetchProduct();
  }, [productId]);

  // Soumettre la mise à jour
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      salePrice: Number(price),
      stock: Number(stock),
      image,
      category,
    };

    try {
      const token = localStorage.getItem("authToken");
      await service.put(`/products/${productId}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/about"); // Retour à la page About après mise à jour
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      setError("Une erreur est survenue. Vérifiez vos champs et réessayez.");
    }
  };

  // Supprimer le produit
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await service.delete(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/about"); // Retour après suppression
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Impossible de supprimer le produit. Réessayez.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-product-page">
        <h2>Edit Product</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {isEditing && (
          <form onSubmit={handleSubmit} className="edit-product-form">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

            {/* Affichage de l'image uniquement si elle existe */}
            {image ? (
              <img
                src={image}
                alt="Product Preview"
                style={{ maxWidth: "200px", margin: "10px 0" }}
              />
            ) : null}

            <button type="submit">Update Product</button>
            <button
              type="button"
              onClick={handleDelete}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default EditProductsPage;
