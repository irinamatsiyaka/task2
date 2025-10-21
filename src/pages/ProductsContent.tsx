import React from "react";
import { Link } from "react-router-dom";

import { useGetProductsQuery } from "../api/productsApi";

import {
   Grid,
   Card,
   CardContent,
   CardMedia,
   Typography,
   Button,
   Box,
   Skeleton,
   IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import type { Product } from "../types/product";
import type { User } from "../types/user";

type ProductsContentProps = {
   setCartCount: React.Dispatch<React.SetStateAction<number>>;
   user: User | null;
};

export type ProductInCart = Product & {
   quatity: number;
};

function ProductsContent({
   setCartCount,
   user,
}: ProductsContentProps): React.JSX.Element {
   const { data = { products: [] }, isLoading, error } = useGetProductsQuery();
   const { enqueueSnackbar } = useSnackbar();

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
      const existingItem = cart.find((item: Product) => item.id === product.id);

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

   if (isLoading) {
      return (
         <Box sx={{ p: 4 }}>
            <Typography variant="h4" align="center">
               Loading products...
            </Typography>
            <Grid container spacing={3} justifyContent="center">
               {Array.from(new Array(8)).map((_: undefined, index: number) => (
                  <Grid key={index}>
                     <Card
                        sx={{
                           width: 300,
                           aspectRatio: "3 / 5",
                           borderRadius: 3,
                        }}
                     >
                        <Skeleton
                           variant="rectangular"
                           width="100%"
                           height={250}
                        />
                        <CardContent>
                           <Skeleton variant="text" width="80%" height={30} />
                           <Skeleton variant="text" width="40%" height={20} />
                        </CardContent>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         </Box>
      );
   }

   if (error) return <p>Error loading products</p>;

   return (
      <Box sx={{ p: 4 }}>
         <Typography variant="h2" align="center" sx={{ mb: 4 }}>
            Products Catalog
         </Typography>
         <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
         >
            {data.products.map((product: Product) => (
               <Grid key={product.id}>
                  <Card
                     component={Link}
                     to={`/product/${product.id}`}
                     sx={{
                        width: 300,
                        aspectRatio: "3 / 5",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: 3,
                        borderRadius: 3,
                        textDecoration: "none",
                        position: "relative",
                     }}
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
                           event: React.MouseEvent<
                              HTMLButtonElement | HTMLAnchorElement
                           >
                        ) => {
                           event.preventDefault();

                           handleAddToCart(event, product);
                        }}
                     >
                        <ShoppingCartIcon sx={{ color: "#1976d2" }} />
                     </IconButton>

                     <CardMedia
                        component="img"
                        image={product.thumbnail}
                        loading="lazy"
                        alt={product.description}
                        sx={{
                           aspectRatio: "9 / 10",
                           width: "100%",
                           objectFit: "cover",
                           borderRadius: "12px 12px 0 0",
                        }}
                     />
                     <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                           variant="h6"
                           style={{
                              textDecoration: "none",
                              color: "#1976d2",
                              fontWeight: 500,
                           }}
                        >
                           {product.title}
                        </Typography>
                        <Typography
                           variant="body2"
                           color="text.secondary"
                           sx={{ mt: 1 }}
                        >
                           ${product.price}
                        </Typography>
                     </CardContent>

                     <Button variant="contained" sx={{ borderRadius: 0 }}>
                        View details
                     </Button>
                  </Card>
               </Grid>
            ))}
         </Grid>
      </Box>
   );
}

ProductsContent.propTypes = {
   setCartCount: PropTypes.func.isRequired,
   user: PropTypes.object,
};

export default ProductsContent;
