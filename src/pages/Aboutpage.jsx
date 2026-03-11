import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Aboutpage.css";
import Navbar from "../components/Navbar";
import service from "../services/config.services";

function Aboutpage() {
  // État pour stocker les informations de l'utilisateur
  const [user, setUser] = useState(null);

  // État pour stocker les produits
  const [products, setProducts] = useState([]);

  // Hook pour naviguer entre les pages
  const navigate = useNavigate();

  // États pour l'édition en ligne
  const [editingField, setEditingField] = useState(null); // "username" or "email"
  const [editValue, setEditValue] = useState("");

  // Charger les informations utilisateur et produits au montage
  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, []);

  // Initialiser la valeur de l'input quand on commence à éditer
  useEffect(() => {
    if (user && editingField) {
      if (editingField === "username") setEditValue(user.username);
      if (editingField === "email") setEditValue(user.email);
    }
  }, [user, editingField]);

  // Récupérer les informations de l'utilisateur
  const fetchUser = async () => {
    try {
      const response = await service.get("/user/me");
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Récupérer tous les produits
  const fetchProducts = async () => {
    try {
      const response = await service.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fonction pour sauvegarder une modification, mais seulement si elle a changé
  const handleSave = async (field) => {
    // Si la valeur n'a pas changé ou est vide, ne rien faire
    if (!editValue || editValue === user[field]) {
      setEditingField(null); // sortir du mode édition
      return;
    }

    try {
      const data = { [field]: editValue };
      const response = await service.put("/user", data);
      setUser(response.data); // mettre à jour l'état local
      setEditingField(null);  // sortir du mode édition
    } catch (err) {
      console.error(err);
      alert("Error updating information");
    }
  };

  // Affichage si les données ne sont pas encore chargées
  if (!user) return <h3>Loading...</h3>;

  return (
    <>
      {/* Barre de navigation */}
      <Navbar />

      <div className="containerAbout">
        <div className="blocksinfo">
          <div className="photo">
            {/* Ici tu peux mettre une photo de l'utilisateur */}
            <img src="" alt="" />
          </div>

          <div className="info">
            {/* Username */}
            <p>
              <strong>Username: </strong>
              {editingField === "username" ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => handleSave("username")}>Save</button>
                  <button onClick={() => setEditingField(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {user.username}{" "}
                  <button onClick={() => setEditingField("username")}>Edit</button>
                </>
              )}
            </p>

            {/* Email */}
            <p>
              <strong>Email: </strong>
              {editingField === "email" ? (
                <>
                  <input
                    type="email"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                 
                </>
              ) : (
                <>
                  {user.email}{" "}
                 
                </>
              )}
            </p>
          </div>
        </div>

        {/* Section pour afficher les créations de l'utilisateur */}
        <div className="mydolls">
          <div className="requestlist">
            <p>My Requests</p>
          </div>

          <div className="mydollslist">
            <div className="myCreation">
              <p>My Creations Here</p>

              {/* Bouton pour créer un nouveau produit */}
              <button onClick={() => navigate("/post-products")}>Create Product</button>

              {/* Affichage des produits créés par l'utilisateur */}
              {products
                .filter((product) => product.seller === user._id)
                .map((product) => (
                  <div key={product._id} className="productCard">
                    <h4>{product.name}</h4>
                    {product.image && (
                      <img src={product.image} alt={product.name} width="120" />
                    )}

                    {/* Bouton pour éditer le produit */}
                    <button onClick={() => navigate(`/edit-product/${product._id}`)}>
                      Edit
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutpage;