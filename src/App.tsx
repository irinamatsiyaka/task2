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
import ROUTES from "./constants/routes";

function App(): React.JSX.Element {
   const [cartCount, setCartCount] = useState<number>(0);
   const [user, setUser] = useState<User | null>(null);

   const getCartKey = (user: User | null): string => {
      return user ? `cart_user_${user.id}` : "cart_guest";
   };

   useEffect(() => {
      try {
         const storedUserRaw = localStorage.getItem("loggedInUser");
         const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

         const savedCartRaw = localStorage.getItem(getCartKey(storedUser));
         const savedCart = savedCartRaw ? JSON.parse(savedCartRaw) : [];

         if (storedUser) setUser(storedUser);
         setCartCount(Array.isArray(savedCart) ? savedCart.length : 0);
      } catch {
         setUser(null);
         setCartCount(0);
      }
   }, []);

   useEffect(() => {
      try {
         if (!user) {
            const guestCartRaw = localStorage.getItem("cart_guest");
            const guestCart = guestCartRaw ? JSON.parse(guestCartRaw) : [];
            setCartCount(Array.isArray(guestCart) ? guestCart.length : 0);
            return;
         }

         const savedCartRaw = localStorage.getItem(`cart_user_${user.id}`);
         const savedCart = savedCartRaw ? JSON.parse(savedCartRaw) : [];
         setCartCount(Array.isArray(savedCart) ? savedCart.length : 0);
      } catch {
         setCartCount(0);
      }
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
                  to={ROUTES.HOME}
                  sx={{ color: "white", textDecoration: "none" }}
               >
                  Products
               </Typography>

               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <IconButton
                     component={Link}
                     to={ROUTES.CART}
                     sx={{ color: "white" }}
                     disabled={!user}
                     aria-label="open shop cart"
                  >
                     <Badge badgeContent={cartCount} color="secondary" showZero>
                        <ShoppingCartIcon />
                     </Badge>
                  </IconButton>

                  {!user ? (
                     <>
                        <Button
                           color="inherit"
                           component={Link}
                           to={ROUTES.LOGIN}
                        >
                           Login
                        </Button>
                        <Button
                           color="inherit"
                           component={Link}
                           to={ROUTES.REGISTER}
                        >
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
