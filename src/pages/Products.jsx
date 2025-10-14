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
} from "@mui/material";

function Products() {
   const { data = { products: [] }, isLoading, error } = useGetProductsQuery();

   if (isLoading) return <p>Loading...</p>;
   if (error) return <p>Error loading products</p>;
   return (
      <div>
         <Typography variant="h2" align="center">
            Products Catalog
         </Typography>
         <Grid container spacing={3}>
            {data.products.map((product) => (
               <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card
                     component={Link}
                     to={`/product/${product.id}`}
                     sx={{
                        width: "400px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: 3,
                        borderRadius: 3,
                        textDecoration: "none",
                     }}
                  >
                     <CardMedia
                        component="img"
                        image={product.thumbnail}
                        alt={product.title}
                        sx={{ height: 400, objectFit: "cover" }}
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
         {/* <ul>
            {data.products.map((p) => (
               <li key={p.id}>
                  <Link to={`/product/${p.id}`}>{p.title}</Link>
               </li>
            ))}
         </ul> */}
      </div>
   );
}

export default Products;
