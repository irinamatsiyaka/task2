import React from "react";

import { SnackbarProvider } from "notistack";
import ProductDetailsContent from "./ProductDetailsContent";
import type { User } from "../types/user";

type ProductDetailsProps = {
   setCartCount: React.Dispatch<React.SetStateAction<number>>;
   user: User | null;
};

function ProductDetails({
   setCartCount,
   user,
}: ProductDetailsProps): React.JSX.Element {
   return (
      <SnackbarProvider
         maxSnack={3}
         anchorOrigin={{ vertical: "top", horizontal: "center" }}
         autoHideDuration={2000}
      >
         <ProductDetailsContent setCartCount={setCartCount} user={user} />
      </SnackbarProvider>
   );
}

export default ProductDetails;
