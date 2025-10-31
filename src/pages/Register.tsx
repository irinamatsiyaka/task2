import React from "react";
import { SnackbarProvider } from "notistack";
import RegisterForm from "../components/auth/RegisterForm";

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
