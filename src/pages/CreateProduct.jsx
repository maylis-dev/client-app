import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import service from "../services/config.services";
import axios from "axios";
import "./CreateProduct.css";
function CreateProducts() {
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(""); // start empty
  const [error, setError] = useState("");
  // état qui va stocker l'URL de l'image envoyée par le backend (Cloudinary)
  const [imageUrl, setImageUrl] = useState(null);

  // état pour afficher une animation de chargement pendant l'upload
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      setError("Please select a category.");
      return;
    }

    const productData = {
      name,
      salePrice: Number(price),
      description,
      stock: Number(stock),
      imageUrl: imageUrl,
      category,
    };

    try {
      const token = localStorage.getItem("authToken");

      await service.post("/products", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/about");
    } catch (err) {
      console.error("Error creating product:", err);
      setError("Something went wrong. Please check your inputs and try again.");
    }
  };

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      // éviter le cas où l'utilisateur ouvre le sélecteur sans choisir de fichier
      return;
    }

    setIsUploading(true); // démarre l'animation de chargement

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    // le mot "image" doit être le même que dans le backend :
    // uploader.single("image")

    try {
      const response = await service.post(
        "/upload",
        uploadData,
        
      );
      console.log(response)

      setImageUrl(response.data.imageUrl);
      // le backend envoie : res.json({ imageUrl: req.file.path });

 
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
      console.error("Erreur upload image:", error);
  setIsUploading(false);
  setError("Problème lors de l'upload de l'image");
  // navigate("/error"); // désactive temporairement pour debugger
    }
  };

  return (
    <>
      <Navbar />

      <div className="products">
      

        <div className="textDetailss">
          {error && <p style={{ color: "pink" }}>{error}</p>}

          <div className="names">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="prices">
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

          <div>
            <label> </label>

            <input
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            {/* disabled empêche l'utilisateur d'uploader une autre image pendant l'upload */}
          </div>

          {/* message de chargement pendant l'upload */}
          {isUploading && <h3>... uploading image</h3>}

          {/* preview de l'image envoyée sur Cloudinary */}
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="preview" width={200} />
            </div>
          )}


          <div className="category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Barbie">Barbie</option>
              <option value="Bratz">Bratz</option>
            </select>
          </div>

          <div className="askrequests">
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
