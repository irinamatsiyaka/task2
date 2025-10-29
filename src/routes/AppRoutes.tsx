import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import type { User } from "../types/user";
import GradientCircularProgress from "../components/common/GradientCircularProgress";

const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Cart = lazy(() => import("../pages/Cart"));

import ROUTES from "../constants/routes";
import ErrorBoundary from "../components/common/ErrorBoundary";

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
         <ErrorBoundary>
            <Routes>
               <Route
                  path={ROUTES.HOME}
                  element={<Products setCartCount={setCartCount} user={user} />}
               />
               <Route
                  path={ROUTES.LOGIN}
                  element={<Login setUser={setUser} />}
               />
               <Route path={ROUTES.REGISTER} element={<Register />} />
               <Route
                  path={ROUTES.PRODUCT}
                  element={
                     <ProductDetails setCartCount={setCartCount} user={user} />
                  }
               />
               <Route
                  path={ROUTES.CART}
                  element={<Cart setCartCount={setCartCount} user={user} />}
               />

               <Route
                  path="*"
                  element={<Navigate to={ROUTES.HOME} replace />}
               />
            </Routes>
         </ErrorBoundary>
      </Suspense>
   );
}

export default AppRoutes;
