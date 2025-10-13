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

function ProductDetails() {
   const { id } = useParams();
   const { data, isLoading, error } = useGetProductByIdQuery(id);

   if (isLoading)
      return (
         <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <GradientCircularProgress />
         </Box>
      );
   if (error)
      return <Typography color="error">Error loading product</Typography>;

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
               onClick={() => alert(`Added "${data.title}" to cart`)}
            >
               <ShoppingCartIcon sx={{ color: "#1976d2" }} />
            </IconButton>
            <CardMedia
               component="img"
               image={data.thumbnail}
               alt={data.title}
               sx={{ height: "100%", objectFit: "cover", borderRadius: 2 }}
            />
            <CardContent>
               <Typography variant="h5" gutterBottom>
                  {data.title}
               </Typography>
               <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
               >
                  {data.description}
               </Typography>
               <Typography variant="h6" color="primary">
                  ${data.price}
               </Typography>
            </CardContent>
         </Card>
      </Box>
   );
}

export default ProductDetails;
