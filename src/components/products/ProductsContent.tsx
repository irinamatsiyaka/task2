import React from "react";

import { useGetProductsQuery } from "../../api/productsApi";

import {
   Grid,
   Card,
   CardContent,
   Typography,
   Box,
   Skeleton,
   Pagination,
   PaginationItem,
} from "@mui/material";

import type { PaginationRenderItemParams } from "@mui/material";

import { Link, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import type { Product } from "../../types/product";
import type { User } from "../../types/user";
import ProductsList from "./ProductsList";

import ROUTES from "../../constants/routes";

type ProductsContentProps = {
   setCartCount: React.Dispatch<React.SetStateAction<number>>;
   user: User | null;
};

export type ProductInCart = Product & {
   quantity: number;
};

function ProductsContent({
   setCartCount,
   user,
}: ProductsContentProps): React.JSX.Element {
   const location = useLocation();
   const query = new URLSearchParams(location.search);
   const pageFromUrl = parseInt(query.get("page") || "1", 10);

   const [page, setPage] = React.useState<number>(pageFromUrl);

   const {
      data = { products: [], total: 0, limit: 10, skip: 0 },
      isLoading,
      error,
   } = useGetProductsQuery(page);
   const { enqueueSnackbar } = useSnackbar();

   React.useEffect(() => {
      if (pageFromUrl !== page) {
         setPage(pageFromUrl);
      }
   }, [pageFromUrl]);

   const handleAddToCart = React.useCallback(
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
            cart = [];
         }
         const existingItem = cart.find(
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
      [user, enqueueSnackbar, setCartCount]
   );

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

   const totalPages = Math.min(
      20,
      Math.ceil((data.total || 0) / (data.limit || 10))
   );

   return (
      <Box sx={{ p: 4 }}>
         <Typography variant="h2" align="center" sx={{ mb: 4 }}>
            Products Catalog
         </Typography>

         <ProductsList
            products={data.products}
            handleAddToCart={handleAddToCart}
         />

         <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
               page={page}
               count={totalPages}
               renderItem={(item: PaginationRenderItemParams) => (
                  <PaginationItem
                     key={item.page ?? `ctrl-${String(item.type)}`}
                     component={Link}
                     to={`${ROUTES.HOME}?page=${item.page ?? page}`}
                     {...item}
                  />
               )}
            />
         </Box>
      </Box>
   );
}

export default ProductsContent;
