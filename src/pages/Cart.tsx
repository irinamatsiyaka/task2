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
import type { User } from "../types/user";
import type { Product } from "../types/product";

export type ProductInCart = Product & {
   quantity: number;
};

export type CartProps = {
   setCartCount: React.Dispatch<React.SetStateAction<number>>;
   user: User | null;
};

function Cart({ setCartCount, user }: CartProps): React.JSX.Element {
   const [cartItems, setCartItems] = useState<ProductInCart[]>([]);

   const cartKey = React.useMemo(
      () => (user ? `cart_user_${user.id}` : "cart_guest"),
      [user]
   );

   useEffect(() => {
      try {
         const raw = localStorage.getItem(cartKey);
         const parsed = raw ? JSON.parse(raw) : [];
         setCartItems(Array.isArray(parsed) ? parsed : []);
      } catch {
         setCartItems([]);
      }
   }, [cartKey]);

   useEffect(() => {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
      const total = cartItems.reduce(
         (sum: number, item: ProductInCart) => sum + item.quantity,
         0
      );
      setCartCount(total);
   }, [cartItems, cartKey, setCartCount]);

   const handleIncrease = (id: number): void => {
      setCartItems((prev: ProductInCart[]): ProductInCart[] =>
         prev.map(
            (cardItem: ProductInCart): ProductInCart =>
               cardItem.id === id
                  ? { ...cardItem, quantity: cardItem.quantity + 1 }
                  : cardItem
         )
      );
   };

   const handleDecrease = (id: number): void => {
      setCartItems((prev: ProductInCart[]): ProductInCart[] =>
         prev
            .map(
               (cardItem: ProductInCart): ProductInCart =>
                  cardItem.id === id
                     ? {
                          ...cardItem,
                          quantity: Math.max(0, cardItem.quantity - 1),
                       }
                     : cardItem
            )
            .filter((cardItem: ProductInCart): boolean => cardItem.quantity > 0)
      );
   };

   const handleClearCart = (): void => {
      localStorage.removeItem(cartKey);
      setCartItems([]);
   };

   const totalPrice = cartItems.reduce(
      (sum: number, item: ProductInCart) => sum + item.price * item.quantity,
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
            {cartItems.map((item: ProductInCart) => (
               <Grid component="div" key={item.id}>
                  <Card
                     sx={{
                        width: 320,
                        aspectRatio: "3 / 5",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: 3,
                        position: "relative",
                        overflow: "visible",
                     }}
                  >
                     <CardMedia
                        component="img"
                        image={item.thumbnail}
                        alt={item.title}
                        loading="lazy"
                        sx={{
                           width: "100%",
                           height: 320,
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
                              {item.quantity}
                           </Typography>

                           <IconButton
                              color="primary"
                              onClick={() => handleIncrease(item.id)}
                           >
                              <AddIcon fontSize="small" />
                           </IconButton>
                        </Box>

                        <Typography color="text.primary" sx={{ mt: 1 }}>
                           Total: ${(item.price * item.quantity).toFixed(2)}
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

export default Cart;
