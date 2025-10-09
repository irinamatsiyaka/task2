import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

function App() {
   return (
      <BrowserRouter>
         <nav>
            <Link to="/">Todos></Link> | <Link to="/login">Login</Link>
         </nav>

         <Routes>
            <Route path="/" element={<Products />} />
            <Route path="login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetails />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
