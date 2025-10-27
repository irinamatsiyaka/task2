import React from "react";
import { SnackbarProvider } from "notistack";
import RegisterForm from "./RegisterForm";

function Register(): React.JSX.Element {
   return (
      <SnackbarProvider
         maxSnack={3}
         anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
         <RegisterForm />
      </SnackbarProvider>
   );
}

export default Register;
