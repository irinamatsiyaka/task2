import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import type { User } from "../types/user";
import GradientCircularProgress from "../components/GradientCircularProgress";

const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Cart = lazy(() => import("../pages/Cart"));

type AppRoutesProps = {
   setCartCount: React.Dispatch<React.SetStateAction<number>>;
   user: User | null;
   setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

function AppRoutes({
   setCartCount,
   user,
   setUser,
}: AppRoutesProps): React.JSX.Element {
   return (
      <Suspense fallback={<GradientCircularProgress />}>
         <Routes>
            <Route
               path="/"
               element={<Products setCartCount={setCartCount} user={user} />}
            />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route
               path="/product/:id"
               element={
                  <ProductDetails setCartCount={setCartCount} user={user} />
               }
            />
            <Route
               path="/cart"
               element={<Cart setCartCount={setCartCount} user={user} />}
            />
         </Routes>
      </Suspense>
   );
}

export default AppRoutes;
