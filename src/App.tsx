import React, { useState, useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import {
   AppBar,
   Toolbar,
   Typography,
   Button,
   Box,
   IconButton,
   Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppRoutes from "./routes/AppRoutes";
import type { User } from "./types/user";

function App(): JSX.Element {
   const [cartCount, setCartCount] = useState<number>(0);
   const [user, setUser] = useState<User | null>(null);

   const getCartKey = (user: User | null): string => {
      return user ? `cart_user_${user.id}` : "cart_guest";
   };

   useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const savedCart =
         JSON.parse(localStorage.getItem(getCartKey(storedUser))) || [];
      if (storedUser) setUser(storedUser);
      setCartCount(savedCart.length);
   }, []);

   useEffect(() => {
      if (!user) {
         const guestCart = JSON.parse(
            localStorage.getItem("cart_guest") || "[]"
         );
         setCartCount(guestCart.length);
         return;
      }

      const savedCart = JSON.parse(
         localStorage.getItem(`cart_user_${user.id}`) || "[]"
      );
      setCartCount(savedCart.length);
   }, [user]);

   const handleLogout = (): void => {
      localStorage.removeItem("loggedInUser");
      setUser(null);
      setCartCount(0);
   };

   return (
      <BrowserRouter>
         <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
               <Typography
                  variant="h6"
                  component={Link}
                  to="/"
                  sx={{ color: "white", textDecoration: "none" }}
               >
                  Products
               </Typography>

               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <IconButton
                     component={Link}
                     to="/cart"
                     sx={{ color: "white" }}
                     disabled={!user}
                  >
                     <Badge badgeContent={cartCount} color="secondary" showZero>
                        <ShoppingCartIcon />
                     </Badge>
                  </IconButton>

                  {!user ? (
                     <>
                        <Button color="inherit" component={Link} to="/login">
                           Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                           Register
                        </Button>
                     </>
                  ) : (
                     <Button color="inherit" onClick={handleLogout}>
                        Logout
                     </Button>
                  )}
               </Box>
            </Toolbar>
         </AppBar>

         <Box>
            <AppRoutes
               setCartCount={setCartCount}
               user={user}
               setUser={setUser}
            />
         </Box>
      </BrowserRouter>
   );
}

export default App;
