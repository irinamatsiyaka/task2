import React from "react";
import { SnackbarProvider } from "notistack";
import ProductsContent from "./ProductsContent";
import type { User } from "../types/user";

type ProductsProps = {
   setCartCount: React.Dispatch<React.SetStateAction<number>>;
   user: User | null;
};
function Products({ setCartCount, user }: ProductsProps): React.JSX.Element {
   return (
      <SnackbarProvider
         maxSnack={3}
         anchorOrigin={{ vertical: "top", horizontal: "center" }}
         autoHideDuration={2000}
      >
         <ProductsContent setCartCount={setCartCount} user={user} />
      </SnackbarProvider>
   );
}

export default Products;
