import React from "react";
import { SnackbarProvider } from "notistack";
import ProductsContent from "./ProductsContent";

function Products(props) {
   return (
      <SnackbarProvider
         maxSnack={3}
         anchorOrigin={{ vertical: "top", horizontal: "center" }}
         autoHideDuration={2000}
      >
         <ProductsContent {...props} />
      </SnackbarProvider>
   );
}

export default Products;
