import React, { useState, useEffect } from "react";
import {
   Box,
   Typography,
   Card,
   CardMedia,
   CardContent,
   IconButton,
   Button,
   Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PropTypes from "prop-types";

function Cart({ setCartCount = () => {} }) {
   const [cartItems, setCartItems] = useState([]);

   useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(savedCart);
   }, []);

   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      const total = cartItems.reduce((sum, item) => sum + item.quatity, 0);
      setCartCount(total);
   }, [cartItems, setCartCount]);

   const handleIncrease = (id) => {
      const updated = cartItems.map((item) =>
         item.id === id ? { ...item, quatity: item.quatity + 1 } : item
      );
      setCartItems(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
   };

   const handleDecrease = (id) => {
      const updated = cartItems
         .map((item) =>
            item.id === id ? { ...item, quatity: item.quatity - 1 } : item
         )
         .filter((item) => item.quatity > 0);
      setCartItems(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
   };

   const handleClearCart = () => {
      setCartItems([]);
      localStorage.removeItem("cart");
   };

   const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quatity,
      0
   );

   if (cartItems.length === 0) {
      return (
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               mt: 5,
            }}
         >
            <Typography variant="h5" gutterBottom>
               Your cart is empty
            </Typography>
            <Typography color="text.secondary">
               Add something from the catalog!
            </Typography>
         </Box>
      );
   }

   return (
      <Box sx={{ p: 4 }}>
         <Typography variant="h4" align="center" gutterBottom>
            Your Shopping Cart
         </Typography>

         <Grid container spacing={3} justifyContent="center">
            {cartItems.map((item) => (
               <Grid key={item.id}>
                  <Card
                     sx={{
                        width: 300,
                        aspectRatio: "3 / 5",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: 3,
                     }}
                  >
                     <CardMedia
                        component="img"
                        image={item.thumbnail}
                        alt={item.title}
                        sx={{
                           height: "100%",
                           width: "100%",
                           objectFit: "cover",
                        }}
                     />
                     <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography color="text.secondary">
                           Price: ${item.price}
                        </Typography>

                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              mt: 1,
                           }}
                        >
                           <IconButton
                              color="primary"
                              onClick={() => handleDecrease(item.id)}
                           >
                              <RemoveIcon />
                           </IconButton>

                           <Typography sx={{ mx: 2 }}>
                              {item.quatity}
                           </Typography>

                           <IconButton
                              color="primary"
                              onClick={() => handleIncrease(item.id)}
                           >
                              <AddIcon />
                           </IconButton>
                        </Box>

                        <Typography color="text.primary" sx={{ mt: 1 }}>
                           Total: ${(item.price * item.quatity).toFixed(2)}
                        </Typography>
                     </CardContent>
                  </Card>
               </Grid>
            ))}
         </Grid>

         <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Typography variant="h6" sx={{ mr: 3 }}>
               Total: ${totalPrice.toFixed(2)}
            </Typography>
            <Button
               variant="contained"
               color="error"
               onClick={handleClearCart}
               sx={{ borderRadius: 2 }}
            >
               Clear Cart
            </Button>
         </Box>
      </Box>
   );
}

Cart.propTypes = {
   setCartCount: PropTypes.func.isRequired,
};

export default Cart;
