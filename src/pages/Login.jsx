import React from "react";
import { SnackbarProvider } from "notistack";
import LoginForm from "./LoginForm";
import PropTypes from "prop-types";

export default function Login({ setUser }) {
   return (
      <SnackbarProvider
         maxSnack={3}
         anchorOrigin={{ vertical: "top", horizontal: "center" }}
         autoHideDuration={2000}
      >
         <LoginForm setUser={setUser} />
      </SnackbarProvider>
   );
}

Login.propTypes = {
   setUser: PropTypes.func.isRequired,
};
