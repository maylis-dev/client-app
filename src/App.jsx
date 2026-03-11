import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Barbiepage from "./pages/Barbiepage";

import ProductDetailpage from "./pages/ProductDetailpage";
import Productspage from "./pages/Productspage";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import Requestpage from "./pages/Requestpage";
import Navbar from "./components/Navbar";
import CreateProducts from "./pages/createProduct";
import { AuthWrapper } from "./context/auth.context";
import EditProductsPage from "./pages/EditProduct";
import Bratzpage from "./pages/Bratzpage";


function App() {
  return (
    <>
      <Routes>
       <Route
          path="/"
          element={
            <>
              <Navbar />
              <Homepage />
            </>
          }/>
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/barbies" element={<Barbiepage />} />
        <Route path="/bratzs" element={<Bratzpage />} />
        <Route path="/products" element={< Productspage />} />
        <Route path="/products/:productId" element={<ProductDetailpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/request" element={<Requestpage />} />
       <Route path="/edit-product/:id" element={<EditProductsPage />} />
       
        <Route path="/post-products" element={<CreateProducts />} />
      </Routes>
      <footer/>
    </>
  );
}

export default App;
