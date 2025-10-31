import React, { useState, useCallback } from "react";
import { useGetProductByIdQuery } from "../../api/productsApi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
   Box,
   Typography,
   Card,
   CardContent,
   Button,
   IconButton,
   Skeleton,
} from "@mui/material";
import GradientCircularProgress from "../common/GradientCircularProgress";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSnackbar } from "notistack";
import type { Product } from "../../types/product";
import type { User } from "../../types/user";
import ROUTES from "../../constants/routes";

type ProductDetailsContentProps = {
   setCartCount: React.Dispatch<React.SetStateAction<number>>;
   user: User | null;
};

export type ProductInCart = Product & {
   quantity: number;
};

function ProductDetailsContent({
   setCartCount,
   user,
}: ProductDetailsContentProps): React.JSX.Element {
   const { id } = useParams();
   const { data, isLoading, error } = useGetProductByIdQuery(id ?? "");
   const { enqueueSnackbar } = useSnackbar();
   const [imageLoaded, setImageLoaded] = useState(false);

   const handleAddToCart = useCallback(
      (
         event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
         product: Product
      ): void => {
         event.preventDefault();
         if (!user) {
            enqueueSnackbar("Please login to add products to cart", {
               variant: "warning",
            });
            return;
         }
         const cartKey = `cart_user_${user.id}`;
         let cart: ProductInCart[] = [];

         try {
            const raw = localStorage.getItem(cartKey);
            cart = raw ? (JSON.parse(raw) as ProductInCart[]) : [];
         } catch {
            console.warn(`Invalid cart data for key "${cartKey}"`);
            cart = [];
         }
         const existingItem = cart.some(
            (item: ProductInCart) => item.id === product.id
         );

         let updatedCart;
         if (existingItem) {
            updatedCart = cart.map((item: ProductInCart) =>
               item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
            );
         } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
         }

         localStorage.setItem(cartKey, JSON.stringify(updatedCart));

         const totalItems = updatedCart.reduce(
            (sum: number, item: ProductInCart) => sum + item.quantity,
            0
         );

         setCartCount(totalItems);
      },
      [user, setCartCount, enqueueSnackbar]
   );

   if (!id) return <Typography color="error">Invalid product ID</Typography>;

   if (isLoading)
      return (
         <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <GradientCircularProgress />
         </Box>
      );

   if (
      error &&
      typeof error === "object" &&
      error !== null &&
      "status" in error
   ) {
      const typedError = error as { status: number };
      return <Typography color="error">Error {typedError.status}</Typography>;
   }

   return (
      <Box
         sx={{
            maxWidth: 600,
            mx: "auto",
            mt: 4,
            textAlign: "center",
            height: "100%",
         }}
      >
         <Button
            component={Link}
            to={ROUTES.HOME}
            variant="contained"
            disableElevation
            sx={{ mb: 3 }}
         >
            Back to Products
         </Button>
         <Card
            sx={{
               boxShadow: 3,
               borderRadius: 3,
               p: 2,
               position: "relative",
               height: 580,
            }}
         >
            <IconButton
               aria-label="add to cart"
               sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 3,
                  bgcolor: "white",
                  boxShadow: 1,
                  "&:hover": { bgcolor: "#f5f5f5" },
               }}
               onClick={(
                  event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
               ) => {
                  event.preventDefault();
                  if (!data) return;
                  handleAddToCart(event, data);
               }}
            >
               <ShoppingCartIcon sx={{ color: "#1976d2" }} />
            </IconButton>

            <Box
               sx={{
                  height: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
               }}
            >
               {!imageLoaded && (
                  <Skeleton
                     variant="rectangular"
                     height={400}
                     width="100%"
                     animation="wave"
                     sx={{ position: "absolute", borderRadius: 2, zIndex: 0 }}
                  />
               )}
               <Box
                  component="img"
                  src={data?.thumbnail ?? ""}
                  alt={data?.title ?? "Product image"}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  sx={{
                     opacity: imageLoaded ? 1 : 0,
                     maxHeight: "100%",
                     maxWidth: "100%",
                     objectFit: "contain",
                     transition: "opacity 0.4s ease",
                  }}
               />
            </Box>

            <CardContent>
               <Typography variant="h5" gutterBottom>
                  {data?.title}
               </Typography>
               <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
               >
                  {data?.description}
               </Typography>
               <Typography variant="h6" color="primary">
                  ${data?.price}
               </Typography>
            </CardContent>
         </Card>
      </Box>
   );
}

export default ProductDetailsContent;
