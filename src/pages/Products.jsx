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
function Products({ setCartCount = () => {}, user = null }) {
   const { data = { products: [] }, isLoading, error } = useGetProductsQuery();

   const handleAddToCart = (event, product) => {
      event.preventDefault();
      if (!user) {
         alert("u should login");
         return;
      }
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.some((item) => item.id === product.id);

      let updatedCart;
      if (existingItem) {
         updatedCart = cart.map((item) =>
            item.id === product.id
               ? { ...item, quatity: item.quatity + 1 }
               : item
         );
      } else {
         updatedCart = [...cart, { ...product, quatity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      const totalItems = updatedCart.reduce(
         (sum, item) => sum + item.quatity,
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
               {Array.from(new Array(8)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
            {data.products.map((product) => (
               <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
                        onClick={(event) => {
                           event.preventDefault();

                           handleAddToCart(event, product);
                        }}
                     >
                        <ShoppingCartIcon sx={{ color: "#1976d2" }} />
                     </IconButton>

                     <CardMedia
                        component="img"
                        image={product.thumbnail}
                        alt={product.title}
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

Products.propTypes = {
   setCartCount: PropTypes.func.isRequired,
   user: PropTypes.object,
};

export default Products;
