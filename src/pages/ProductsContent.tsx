import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useGetProductsQuery } from "../api/productsApi";

import {
   Grid,
   Card,
   CardContent,
   Typography,
   Button,
   Box,
   Skeleton,
} from "@mui/material";

import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import type { Product } from "../types/product";
import type { User } from "../types/user";
import ProductsList from "./ProductsList";

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
   const [page, setPage] = useState(1);
   const limit = 10;

   const handlePageChange = (newPage: number): void => {
      if (newPage !== page) setPage(newPage);
   };

   const {
      data = { products: [], total: 0, limit: 10, skip: 0 },
      isLoading,
      isFetching,
      error,
   } = useGetProductsQuery(page);
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
            <Typography variant="h2" align="center" sx={{ mb: 4 }}>
               Loading products...
            </Typography>
            <Grid container spacing={3} justifyContent="center">
               {Array.from(new Array(8)).map((_: undefined, index: number) => (
                  <Grid key={index}>
                     <Card
                        sx={{
                           width: 300,
                           height: 480,
                           borderRadius: 3,
                        }}
                     >
                        <Skeleton
                           variant="rectangular"
                           width="100%"
                           height={320}
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

         <ProductsList
            products={data.products}
            handleAddToCart={handleAddToCart}
         />

         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
               disabled={page === 1 || isFetching}
               onClick={() => handlePageChange(page - 1)}
            >
               Prev
            </Button>

            <Typography variant="body1" sx={{ alignSelf: "center" }}>
               Page {page}
            </Typography>
            <Button
               disabled={isFetching || (data?.total ?? 0) <= page * limit}
               onClick={() => handlePageChange(page + 1)}
            >
               Next
            </Button>
         </Box>
      </Box>
   );
}

ProductsContent.propTypes = {
   setCartCount: PropTypes.func.isRequired,
   user: PropTypes.object,
};

export default ProductsContent;
