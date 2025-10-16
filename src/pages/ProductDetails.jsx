import React from "react";

import { SnackbarProvider } from "notistack";
import ProductDetailsContent from "./ProductDetailsContent";

function ProductDetails(props) {
   return (
      <SnackbarProvider
         maxSnack={3}
         anchorOrigin={{ vertical: "top", horizontal: "center" }}
         autoHideDuration={2000}
      >
         <ProductDetailsContent {...props} />
      </SnackbarProvider>
   );
}

export default ProductDetails;
