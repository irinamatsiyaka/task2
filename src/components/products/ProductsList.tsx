import React from "react";
import { Link } from "react-router-dom";
import {
   Card,
   CardContent,
   CardMedia,
   Typography,
   IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { Product } from "../../types/product";

import Grid from "@mui/material/Grid";

import ROUTES from "../../constants/routes";

type ProductsListProps = {
   products: Product[];
   handleAddToCart: (
      event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
      product: Product
   ) => void;
};

function ProductsList({
   products,
   handleAddToCart,
}: ProductsListProps): React.JSX.Element {
   return (
      <Grid container spacing={3} justifyContent="center" alignItems="center">
         {products.map((product: Product, index: number) => (
            <Grid key={product.id}>
               <Card
                  component={Link}
                  to={ROUTES.PRODUCT.replace(":id", String(product.id))}
                  sx={{
                     width: 300,
                     height: 460,
                     display: "flex",
                     flexDirection: "column",
                     boxShadow: 3,
                     borderRadius: 3,
                     textDecoration: "none",
                     position: "relative",
                  }}
               >
                  <IconButton
                     aria-label="add to cart"
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
                     alt={product.description}
                     fetchPriority={index === 0 ? "high" : "auto"}
                     sx={{
                        width: "100%",
                        height: 320,
                        objectFit: "cover",
                        borderRadius: "12px 12px 0 0",
                        backgroundColor: "#f0f0f0",
                        display: "block",
                     }}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                     <Typography
                        variant="h6"
                        sx={{
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
               </Card>
            </Grid>
         ))}
      </Grid>
   );
}

export default React.memo(ProductsList);
