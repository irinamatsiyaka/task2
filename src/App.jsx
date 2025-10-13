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

function App() {
   const [cartCount, setCartCount] = useState(0);
   const [user, setUser] = useState(null);

   useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (storedUser) setUser(storedUser);
      setCartCount(savedCart.length);
   }, []);

   useEffect(() => {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cartCount !== currentCart.length) {
         localStorage.setItem("cart", JSON.stringify(currentCart));
      }
   }, [cartCount]);

   const handleLogout = () => {
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
