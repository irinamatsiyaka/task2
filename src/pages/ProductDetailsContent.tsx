import React from "react";
import { useGetProductByIdQuery } from "../api/productsApi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
   Box,
   Typography,
   Card,
   CardMedia,
   CardContent,
   Button,
   IconButton,
} from "@mui/material";
import GradientCircularProgress from "../components/GradientCircularProgress";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSnackbar } from "notistack";
import type { Product } from "../types/product";
import type { User } from "../types/user";

type ProductDetailsContentProps = {
   setCartCount: React.Dispatch<React.SetStateAction<number>>;
   user: User | null;
};

export type ProductInCart = Product & {
   quatity: number;
};

function ProductDetailsContent({
   setCartCount,
   user,
}: ProductDetailsContentProps): React.JSX.Element {
   const { id } = useParams<{ id: string }>();
   const { data, isLoading, error } = useGetProductByIdQuery(id ?? "");
   const { enqueueSnackbar } = useSnackbar();

   if (isLoading)
      return (
         <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <GradientCircularProgress />
         </Box>
      );
   if (error)
      return <Typography color="error">Error loading product</Typography>;

   const handleAddToCart = (
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
      const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
      const existingItem = cart.some(
         (item: ProductInCart) => item.id === product.id
      );

      let updatedCart;
      if (existingItem) {
         updatedCart = cart.map((item: ProductInCart) =>
            item.id === product.id
               ? { ...item, quatity: item.quatity + 1 }
               : item
         );
      } else {
         updatedCart = [...cart, { ...product, quatity: 1 }];
      }

      localStorage.setItem(cartKey, JSON.stringify(updatedCart));

      const totalItems = updatedCart.reduce(
         (sum: number, item: ProductInCart) => sum + item.quatity,
         0
      );

      setCartCount(totalItems);
   };

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
            to="/"
            variant="contained"
            disableElevation
            sx={{ mb: 3 }}
         >
            Back to Products
         </Button>
         <Card
            sx={{ boxShadow: 3, borderRadius: 3, p: 2, position: "relative" }}
         >
            <IconButton
               sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "#f5f5f5" },
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
            <CardMedia
               component="img"
               image={data?.thumbnail ?? ""}
               loading="lazy"
               alt={data?.description ?? ""}
               sx={{ height: "100%", objectFit: "cover", borderRadius: 2 }}
            />
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
