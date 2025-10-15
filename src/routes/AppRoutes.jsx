import React from "react";
import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";

function AppRoutes({ setCartCount, user, setUser }) {
   return (
      <Routes>
         <Route
            path="/"
            element={<Products setCartCount={setCartCount} user={user} />}
         />
         <Route path="/login" element={<Login setUser={setUser} />} />
         <Route path="/register" element={<Register />} />
         <Route
            path="/product/:id"
            element={<ProductDetails setCartCount={setCartCount} user={user} />}
         />
         <Route
            path="/cart"
            element={<Cart setCartCount={setCartCount} user={user} />}
         />
      </Routes>
   );
}

AppRoutes.propTypes = {
   setCartCount: PropTypes.func.isRequired,
   user: PropTypes.object,
   setUser: PropTypes.func.isRequired,
};

export default AppRoutes;
