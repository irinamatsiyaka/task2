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
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

function ProductDetailsContent({ setCartCount = () => {}, user = null }) {
   const { id } = useParams();
   const { data, isLoading, error } = useGetProductByIdQuery(id);
   const { enqueueSnackbar } = useSnackbar();

   if (isLoading)
      return (
         <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <GradientCircularProgress />
         </Box>
      );
   if (error)
      return <Typography color="error">Error loading product</Typography>;

   const handleAddToCart = (event, product) => {
      event.preventDefault();
      if (!user) {
         enqueueSnackbar("Please login to add products to cart", {
            variant: "warning",
         });
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
               onClick={(event) => {
                  event.preventDefault();

                  handleAddToCart(event, data);
               }}
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

ProductDetailsContent.propTypes = {
   setCartCount: PropTypes.func.isRequired,
   user: PropTypes.object,
};

export default ProductDetailsContent;
